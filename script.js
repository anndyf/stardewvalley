document.addEventListener('DOMContentLoaded', () => {

    // --- 1. FONTE DE DADOS ---
    const PRODUTOS_ARTESANAIS_INFO = {
        'geleia_picles': { nome: 'Geleia / Conserva', tempo_min: 4000, maquina: 'jarra' },
        'vinho': { nome: 'Vinho', tempo_min: 10000, maquina: 'barril' },
        'suco': { nome: 'Suco', tempo_min: 6000, maquina: 'barril' },
        'fruta_ressecada': { nome: 'Fruta Ressecada', tempo_min: 1750, maquina: 'desidratador' },
        'oleo': { nome: 'Óleo', tempo_min: 3200, maquina: 'oleo' },
        'pale_ale': { nome: 'Pale Ale', tempo_min: 2250, maquina: 'barril' },
        'cerveja': { nome: 'Cerveja', tempo_min: 1750, maquina: 'barril' },
        'cafe': { nome: 'Café', tempo_min: 120, maquina: 'barril' },
        'cha_verde': { nome: 'Chá Verde', tempo_min: 180, maquina: 'barril' },
        'arroz': { nome: 'Arroz', tempo_min: 0, maquina: 'moinho' },
        'hidromel': { nome: 'Hidromel', tempo_min: 600, maquina: 'barril' },
        'vinagre': { nome: 'Vinagre', tempo_min: 600, maquina: 'barril' },
        'passas': { nome: 'Passas', tempo_min: 1750, maquina: 'desidratador' },
        'mel_de_flor': { nome: 'Mel', tempo_min: 4320, maquina: 'apiario' }
    };
    const MULTIPLICADOR_QUALIDADE = { 'normal': 1.0, 'prata': 1.25, 'ouro': 1.5, 'iridio': 2.0 };

    // --- 2. ELEMENTOS DO DOM (COM FILTROS) ---
    const form = document.getElementById('calc-form');
    // NOVOS ELEMENTOS DE FILTRO
    const selectEstacao = document.getElementById('filtro-estacao');
    const selectTipo = document.getElementById('filtro-tipo');
    // FIM DOS NOVOS ELEMENTOS
    const selectCultivo = document.getElementById('cultivo');
    const resultadosContainer = document.getElementById('resultados');
    const resumoCultivo = document.getElementById('resumo-cultivo');
    const totalSementesEl = document.getElementById('total-sementes');
    const custoTotalEl = document.getElementById('custo-total');
    const totalColheitasEl = document.getElementById('total-colheitas');
    const totalFrutosEl = document.getElementById('total-frutos');
    const detalhesContainer = document.getElementById('detalhes');
    const selectPeriodo = document.getElementById('periodo');
    const maquinaFormGroups = document.querySelectorAll('.form-group[data-maquina]');
    const custoSementeUnitarioEl = document.getElementById('custo-semente-unitario');
    const precoBaseUnitarioEl = document.getElementById('preco-base-unitario');
    const resumoImagemCultivoEl = document.getElementById('resumo-imagem-cultivo');


    // --- 3. LÓGICA DE INICIALIZAÇÃO (COM FILTROS) ---
    
    // --- FUNÇÃO POPULARCULTIVOS ATUALIZADA ---
    function popularCultivos() {
        // 1. Validar dados
        if (typeof DADOS_CULTURAS === 'undefined' || Object.keys(DADOS_CULTURAS).length === 0) {
             console.error("DADOS_CULTURAS não foi definido ou está vazio.");
             alert("Erro fatal: Arquivo 'dados_culturas.js' não foi carregado ou está vazio.");
             return false;
        }

        // 2. Obter valores dos filtros
        const estacaoSelecionada = selectEstacao.value;
        const tipoSelecionado = selectTipo.value;

        // 3. Filtrar os cultivos
        const cultivosFiltrados = Object.entries(DADOS_CULTURAS).filter(([, cultura]) => {
            // Filtro de Estação
            const estacaoOk = (estacaoSelecionada === 'todas') || 
                              (cultura.estacoes && cultura.estacoes.includes(estacaoSelecionada));
            if (!estacaoOk) return false;

            // Filtro de Tipo (Única vs. Múltipla)
            // tempo_renovacao: 0 = única, > 0 = múltipla
            const tipoOk = (tipoSelecionado === 'todos') ||
                           (tipoSelecionado === 'unica' && cultura.tempo_renovacao === 0) ||
                           (tipoSelecionado === 'multipla' && cultura.tempo_renovacao > 0);
            if (!tipoOk) return false;
            
            return true; // Passou em ambos os filtros
        });

        // 4. Ordenar os cultivos filtrados
        const cultivosOrdenados = cultivosFiltrados.sort(([, a], [, b]) => {
            return a.nome.localeCompare(b.nome);
        });

        // 5. Limpar e popular o select de cultivos
        selectCultivo.innerHTML = ''; // Limpa opções antigas

        if (cultivosOrdenados.length === 0) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'Nenhum cultivo encontrado';
            option.disabled = true;
            selectCultivo.appendChild(option);
        } else {
            for (const [id, cultura] of cultivosOrdenados) {
                const option = document.createElement('option');
                option.value = id;
                option.textContent = cultura.nome;
                selectCultivo.appendChild(option);
            }
        }

        // 6. Atualizar a UI (máquinas e resultados)
        // Isso garante que as máquinas corretas sejam exibidas para o primeiro item da lista filtrada
        // e que resultados antigos sejam ocultados.
        atualizarVisibilidadeMaquinas(); 
        resultadosContainer.style.display = 'none';

        return true;
    }
    // --- FIM DA FUNÇÃO POPULARCULTIVOS ---

    function atualizarVisibilidadeMaquinas() {
        const cultivoId = selectCultivo.value;
        // SE NÃO HOUVER CULTIVO (FILTRO VAZIO), ESCONDE TUDO
        if (!cultivoId || !DADOS_CULTURAS[cultivoId]) {
             maquinaFormGroups.forEach(group => {
                group.style.display = 'none';
            });
            return;
        }
        
        const cultura = DADOS_CULTURAS[cultivoId];
        const maquinasUsadas = new Set();
        if (cultura.produtos_artesanais) {
            for (const tipoId in cultura.produtos_artesanais) {
                const produtoInfo = PRODUTOS_ARTESANAIS_INFO[tipoId];
                if (produtoInfo && produtoInfo.maquina) {
                    maquinasUsadas.add(produtoInfo.maquina);
                }
            }
        }
        maquinaFormGroups.forEach(group => {
            const tipoMaquina = group.dataset.maquina;
            if (maquinasUsadas.has(tipoMaquina)) {
                group.style.display = 'flex';
            } else {
                group.style.display = 'none';
            }
        });
     }

    // --- 4. LÓGICA DE CÁLCULO (AJUSTADA V4.13) ---
    // (Esta seção permanece IDÊNTICA à sua versão v4.14)
    function calcularLucro(event) {
        event.preventDefault();
        const inputs = getInputs();
        if (!inputs.cultivoId || !DADOS_CULTURAS[inputs.cultivoId]) {
            alert("Erro: Nenhum cultivo selecionado ou dados indisponíveis."); return;
        }
        const cultura = DADOS_CULTURAS[inputs.cultivoId];
        const DIAS_CALCULO = inputs.dias;

        // --- CÁLCULOS SEPARADOS ---
        // 1. Potencial Total na Estação (para Resumo e Lucro/Dia)
        const custoTotalSementesEstacao = cultura.custo_semente * inputs.quantidade; // Custo inicial
        let colheitasPorPlantaEstacao = 0;
        if (cultura.tempo_crescimento > 0) {
            if (cultura.tempo_renovacao > 0) { // Renovável
                if (DIAS_CALCULO >= cultura.tempo_crescimento) {
                    colheitasPorPlantaEstacao = 1 + Math.floor((DIAS_CALCULO - cultura.tempo_crescimento) / cultura.tempo_renovacao);
                }
            } else { // Não Renovável (Ciclos)
                colheitasPorPlantaEstacao = Math.floor((DIAS_CALCULO - 1) / cultura.tempo_crescimento);
            }
        }
        colheitasPorPlantaEstacao = Math.max(0, colheitasPorPlantaEstacao);
        // Total de frutos colhidos ao longo de TODA a estação
        const totalFrutosEstacao = Math.floor(colheitasPorPlantaEstacao * cultura.frutos_por_colheita * inputs.quantidade);

        // 2. Resultado de UM Ciclo de Colheita (para Tabela Comparativa)
        const custoTotalSementesCiclo = cultura.custo_semente * inputs.quantidade; // Custo para plantar uma vez
        // Quantidade de frutos colhidos em UMA colheita (ou ciclo, para renováveis)
        const totalFrutosCiclo = Math.floor(cultura.frutos_por_colheita * inputs.quantidade);
        // --- FIM DOS CÁLCULOS SEPARADOS ---


        // 4.3. Venda Direta
        const precoVendaDiretaUnitario = cultura.preco_base * MULTIPLICADOR_QUALIDADE[inputs.qualidade];
        const modProfissaoDireta = (inputs.profissao === 'cultivador') ? 1.1 : 1.0;
        const precoVendaDiretaFinal = precoVendaDiretaUnitario * modProfissaoDireta;

        // Venda Direta - Lucro de UM ciclo (para tabela)
        const receitaDiretaCiclo = precoVendaDiretaFinal * totalFrutosCiclo;
        const lucroDiretoCiclo = receitaDiretaCiclo - custoTotalSementesCiclo;

        // Venda Direta - Lucro/Dia MÉDIO da estação (para tabela e resumo)
        const receitaDiretaEstacao = precoVendaDiretaFinal * totalFrutosEstacao;
        // Custo real da estação (considera replantio para não renováveis)
        const custoRealEstacaoDireta = (cultura.tempo_renovacao === 0 && colheitasPorPlantaEstacao > 0) ? custoTotalSementesCiclo * colheitasPorPlantaEstacao : custoTotalSementesEstacao;
        const lucroDiretoEstacao = receitaDiretaEstacao - custoRealEstacaoDireta;
        const lucroDiaDiretoEstacao = (DIAS_CALCULO > 0) ? (lucroDiretoEstacao / DIAS_CALCULO) : 0;

        const resultados = {
            'direta': {
                nome: `Venda Direta`,
                qualidade: inputs.qualidade,
                totalProdutos: totalFrutosCiclo, // Produtos de 1 ciclo
                receitaTotal: receitaDiretaCiclo, // Receita de 1 ciclo
                custoTotal: custoTotalSementesCiclo, // Custo de 1 ciclo
                lucro: lucroDiretoCiclo,          // Lucro de 1 ciclo
                lucroDia: lucroDiaDiretoEstacao,   // Lucro/Dia MÉDIO da estação
                tempoTotal: null,
                tempoItem: null,
                itensConsumidos: 1
            }
        };

        // 4.4. Produtos Artesanais
        for (const tipoId in cultura.produtos_artesanais) {
            if (tipoId === 'mel_de_flor') continue;
            const produtoInfo = PRODUTOS_ARTESANAIS_INFO[tipoId];
            const produtoPrecos = cultura.produtos_artesanais[tipoId];
            if (!produtoInfo || !produtoPrecos) continue;

            let precoUnitarioFinal = (inputs.profissao === 'artesao') ? produtoPrecos.artesao : produtoPrecos.base;
            let itensConsumidos = 1;
            if (tipoId === 'cafe' || tipoId === 'fruta_ressecada' || tipoId === 'passas') {
                itensConsumidos = 5;
            }

            // Produtos e Lucro de UM ciclo (para tabela)
            const totalProdutosFeitosCiclo = Math.floor(totalFrutosCiclo / itensConsumidos);
            const receitaArtesanalCiclo = precoUnitarioFinal * totalProdutosFeitosCiclo;
            const lucroArtesanalCiclo = receitaArtesanalCiclo - custoTotalSementesCiclo;

            // Lucro/Dia MÉDIO da estação (para tabela e resumo)
            const totalProdutosFeitosEstacao = Math.floor(totalFrutosEstacao / itensConsumidos);
            const receitaArtesanalEstacao = precoUnitarioFinal * totalProdutosFeitosEstacao;
            // Custo real da estação (considera replantio para não renováveis)
            const custoRealEstacaoArtesao = (cultura.tempo_renovacao === 0 && colheitasPorPlantaEstacao > 0) ? custoTotalSementesCiclo * colheitasPorPlantaEstacao : custoTotalSementesEstacao;
            const lucroArtesanalEstacao = receitaArtesanalEstacao - custoRealEstacaoArtesao;
            const lucroDiaArtesanalEstacao = (DIAS_CALCULO > 0) ? (lucroArtesanalEstacao / DIAS_CALCULO) : 0;

            let numMaquinasParaProduto = 0;
             switch (produtoInfo.maquina) {
                case 'jarra': numMaquinasParaProduto = inputs.maquinas.jarra; break;
                case 'barril': numMaquinasParaProduto = inputs.maquinas.barril; break;
                case 'desidratador': numMaquinasParaProduto = inputs.maquinas.desidratador; break;
                case 'oleo': numMaquinasParaProduto = inputs.maquinas.oleo; break;
                default: numMaquinasParaProduto = 0;
            }

            // Tempo total baseado nos produtos de UM ciclo
            const tempoProcessamentoTotalCiclo = calcularTempoProcessamento(totalProdutosFeitosCiclo, numMaquinasParaProduto, produtoInfo.tempo_min);

            resultados[tipoId] = {
                nome: produtoInfo.nome,
                totalProdutos: totalProdutosFeitosCiclo, // Produtos de 1 ciclo
                receitaTotal: receitaArtesanalCiclo,    // Receita de 1 ciclo
                custoTotal: custoTotalSementesCiclo,    // Custo de 1 ciclo
                lucro: lucroArtesanalCiclo,          // Lucro de 1 ciclo
                lucroDia: lucroDiaArtesanalEstacao,   // Lucro/Dia MÉDIO da estação
                tempoTotal: tempoProcessamentoTotalCiclo, // Tempo para processar 1 ciclo
                tempoItem: produtoInfo.tempo_min,
                itensConsumidos: itensConsumidos
            };
        }

        // 4.5. Mel
        if (cultura.produtos_artesanais.mel_de_flor && inputs.maquinas.apiario > 0) {
            const produtoInfo = PRODUTOS_ARTESANAIS_INFO['mel_de_flor'];
            const produtoPrecos = cultura.produtos_artesanais.mel_de_flor;
            const colheitasDeMel = Math.floor(DIAS_CALCULO / 4);
            const totalMel = colheitasDeMel * inputs.maquinas.apiario;
            let precoMelUnitario = (inputs.profissao === 'artesao') ? produtoPrecos.artesao : produtoPrecos.base;
            const receitaMel = totalMel * precoMelUnitario;
            const lucroMel = receitaMel;
            const lucroDiaMel = (DIAS_CALCULO > 0) ? (lucroMel / DIAS_CALCULO) : 0;
            // Custo real da estação para a flor base (considera replantio)
            const custoRealEstacaoFlor = (cultura.tempo_renovacao === 0 && colheitasPorPlantaEstacao > 0) ? custoTotalSementesCiclo * colheitasPorPlantaEstacao : custoTotalSementesEstacao;


            // O card combinado mostra o lucro TOTAL da estação
            resultados['direta_e_mel'] = {
                nome: `Venda Direta + Mel`,
                qualidade: inputs.qualidade,
                totalProdutos: null, // Não aplicável
                receitaTotal: receitaDiretaEstacao + receitaMel, // Receita total estação
                custoTotal: custoRealEstacaoFlor, // Custo real da estação
                lucro: lucroDiretoEstacao + lucroMel,    // Lucro total estação
                lucroDia: lucroDiaDiretoEstacao + lucroDiaMel, // Lucro/Dia estação
                tempoTotal: null,
                tempoItem: null,
                itensConsumidos: 1
            };
             // O card só do mel mostra o lucro TOTAL do mel na estação
             resultados['mel_de_flor'] = {
                nome: `Apenas Mel`,
                totalProdutos: totalMel, // Total de mel na estação
                receitaTotal: receitaMel, // Receita total estação
                custoTotal: 0, // Custo está na flor
                lucro: lucroMel,        // Lucro total estação
                lucroDia: lucroDiaMel,    // Lucro/Dia estação
                tempoTotal: `~4 dias/colheita`,
                tempoItem: produtoInfo.tempo_min,
                itensConsumidos: 1
            };
        }

        // Passa custo da estação, colheitas da estação, frutos do CICLO e frutos da ESTAÇÃO
        atualizarUI(cultura, inputs, custoTotalSementesEstacao, colheitasPorPlantaEstacao, totalFrutosCiclo, totalFrutosEstacao, resultados, DIAS_CALCULO);
    }

    function getInputs() {
        return {
            cultivoId: selectCultivo.value,
            quantidade: parseInt(document.getElementById('quantidade').value) || 1,
            profissao: document.getElementById('profissao').value,
            qualidade: document.getElementById('qualidade').value,
            dias: parseInt(selectPeriodo.value) || 28,
            maquinas: {
                jarra: parseInt(document.getElementById('maquinas_jarra').value) || 0,
                barril: parseInt(document.getElementById('maquinas_barril').value) || 0,
                desidratador: parseInt(document.getElementById('maquinas_desidratador').value) || 0,
                oleo: parseInt(document.getElementById('maquinas_oleo').value) || 0,
                apiario: parseInt(document.getElementById('maquinas_apiario').value) || 0
            }
        };
     }
    function calcularTempoProcessamento(totalItens, numMaquinas, tempoPorItemMin) {
        if (tempoPorItemMin === 0) return "N/A";
        if (numMaquinas <= 0) return "N/A";
        const totalLotes = Math.ceil(totalItens / numMaquinas);
        const totalMinutos = totalLotes * tempoPorItemMin;
        const dias = Math.floor(totalMinutos / 1440);
        const horas = Math.floor((totalMinutos % 1440) / 60);
        return (dias === 0 && horas === 0) ? "N/A" : `${dias}d ${horas}h`;
     }
    function formatarTempoIndividual(minutos) {
         if (minutos === 0) return "Instantâneo";
        if (minutos < 60) return `${minutos} min`;
        if (minutos < 1440) {
            const horas = Math.floor(minutos / 60);
            const minRestantes = minutos % 60;
            return `${horas}h ${minRestantes > 0 ? minRestantes + 'min' : ''}`.trim();
        }
        const dias = Math.floor(minutos / 1440);
        const horasRestantes = Math.floor((minutos % 1440) / 60);
        return `${dias}d ${horasRestantes > 0 ? horasRestantes + 'h' : ''}`.trim();
     }
    function formatarNumero(num, casasDecimais = 0) {
        if (num === null || typeof num === 'undefined') return 'N/A';
        return num.toLocaleString('pt-BR', {
            minimumFractionDigits: casasDecimais,
            maximumFractionDigits: casasDecimais
        });
     }
    function getNomeCabecalho(tipoId, dados) {
         const nomes = {
            'direta': `Venda (${dados.qualidade || 'normal'})`,
            'direta_e_mel': `Venda (${dados.qualidade || 'normal'}) + Mel`,
            'geleia_picles': 'Jarra',
            'vinho': 'Vinho',
            'suco': 'Suco',
            'fruta_ressecada': 'Desidratador',
            'oleo': 'Óleo',
            'pale_ale': 'Pale Ale',
            'cerveja': 'Cerveja',
            'cafe': 'Café',
            'cha_verde': 'Chá',
            'hidromel': 'Hidromel',
            'vinagre': 'Vinagre',
            'passas': 'Passas',
            'mel_de_flor': 'Mel',
            'arroz': 'Arroz'
        };
        return nomes[tipoId] || (dados && dados.nome) || tipoId;
     }

    // --- 5. ATUALIZAÇÃO DA INTERFACE (V4.14 - Ajusta "Total Frutos" no Resumo) ---
    // (Esta seção permanece IDÊNTICA à sua versão v4.14)
    function atualizarUI(cultura, inputs, custoTotalEstacao, colheitasEstacao, frutosCiclo, frutosEstacao, resultados, diasCalculo) {
        resultadosContainer.style.display = 'block';

        // Atualiza Resumo (Usa totais da ESTAÇÃO, exceto frutos para ciclo único)
        resumoCultivo.textContent = `${inputs.quantidade}x ${cultura.nome} (${diasCalculo} dias)`;
        totalSementesEl.textContent = formatarNumero(inputs.quantidade);
        custoTotalEl.textContent = `${formatarNumero(cultura.tempo_renovacao === 0 && colheitasEstacao > 0 ? cultura.custo_semente * inputs.quantidade * colheitasEstacao : custoTotalEstacao)}g`; // Custo Estação REAL
        custoSementeUnitarioEl.textContent = `${formatarNumero(cultura.custo_semente)}g`;
        precoBaseUnitarioEl.textContent = `${formatarNumero(cultura.preco_base)}g`;
        totalColheitasEl.textContent = `${formatarNumero(colheitasEstacao)} (ciclos/ladrilho)`;

        // ATUALIZAÇÃO V4.14: Decide qual total de frutos mostrar no Resumo
        if (cultura.tempo_renovacao === 0) { // Colheita Única
            totalFrutosEl.textContent = `${formatarNumero(frutosCiclo)} (por ciclo)`;
        } else { // Colheita Múltipla
            totalFrutosEl.textContent = formatarNumero(frutosEstacao); // Total da Estação
        }

        const imagemUrl = cultura.imagem_url || '';
        resumoImagemCultivoEl.src = imagemUrl;
        resumoImagemCultivoEl.alt = cultura.nome;
        resumoImagemCultivoEl.style.display = imagemUrl ? 'inline-block' : 'none';

        // Limpa e Cria a Tabela (Lógica V4.13)
        detalhesContainer.innerHTML = '';
        // FIX: Criar o contêiner da tabela que o CSS V4.x espera
        const tableContainer = document.createElement('div');
        tableContainer.className = 'table-container';
        detalhesContainer.appendChild(tableContainer);

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        table.appendChild(thead);
        table.appendChild(tbody);
        
        // Ordena pelo Lucro/Dia da Estação para melhor comparação de rentabilidade
        const resultadosOrdenados = Object.entries(resultados).sort(([, a], [, b]) => b.lucroDia - a.lucroDia);
        const headerRow = document.createElement('tr');
        const thMetrica = document.createElement('th');
        thMetrica.textContent = 'Métrica';
        headerRow.appendChild(thMetrica);
        
        const colHeaders = []; // Para usar nos 'data-label'
        
        resultadosOrdenados.forEach(([tipoId, dados]) => {
            const thMetodo = document.createElement('th');
            const nomeCabecalho = getNomeCabecalho(tipoId, dados);
            thMetodo.textContent = nomeCabecalho;
            thMetodo.classList.add(`th-${tipoId}`);
            headerRow.appendChild(thMetodo);
            colHeaders.push(nomeCabecalho);
        });
        thead.appendChild(headerRow);

        const metricas = [
            { key: 'totalProdutos', label: 'Rendimento' },
            { key: 'receitaTotal', label: 'Receita' },
            { key: 'custoTotal', label: 'Custo', classe_tr: 'cost-row'},
            { key: 'lucro', label: 'Lucro', classe_tr: 'profit-row'},
            { key: 'lucroDia', label: 'Lucro por Dia' },
            { key: 'tempoItem', label: 'Tempo por Item' },
            { key: 'tempoTotal', label: 'Tempo Total'},
            { key: 'itensConsumidos', label: 'Itens p/ Processo' }
        ];

        metricas.forEach(metrica => {
            let temMetrica = resultadosOrdenados.some(([, dados]) => dados[metrica.key] !== null && typeof dados[metrica.key] !== 'undefined');
             if (metrica.key === 'itensConsumidos') {
                 temMetrica = resultadosOrdenados.some(([, dados]) => dados.itensConsumidos && dados.itensConsumidos > 1);
            }
            if (metrica.key === 'tempoItem') {
                temMetrica = resultadosOrdenados.some(([, dados]) => dados.tempoItem !== null && dados.tempoItem > 0);
            }
             if (metrica.key === 'custoTotal') {
                 temMetrica = resultadosOrdenados.some(([tipoId, dados]) => tipoId !== 'mel_de_flor' && dados.custoTotal !== null);
             }
             if (metrica.key === 'totalProdutos') {
                  temMetrica = resultadosOrdenados.some(([tipoId, dados]) => tipoId !== 'direta_e_mel' && dados.totalProdutos !== null);
             }

            if (temMetrica) {
                const row = document.createElement('tr');
                if (metrica.classe_tr) {
                    row.classList.add(metrica.classe_tr);
                }
                const tdLabel = document.createElement('td');
                tdLabel.textContent = metrica.label;
                row.appendChild(tdLabel);
                
                resultadosOrdenados.forEach(([tipoId, dados], index) => {
                    const tdValor = document.createElement('td');
                    tdValor.setAttribute('data-label', colHeaders[index]); // Adiciona o data-label
                    let valor = dados[metrica.key];
                    let conteudoFormatado = '';
                    
                    if (valor !== null && typeof valor !== 'undefined') {
                        if (metrica.key === 'totalProdutos') {
                             conteudoFormatado = (tipoId !== 'direta_e_mel') ? formatarNumero(valor) : '-';
                        } else if (metrica.key === 'receitaTotal' || metrica.key === 'custoTotal' || metrica.key === 'lucro') {
                            if (metrica.key === 'custoTotal' && tipoId === 'mel_de_flor') {
                                conteudoFormatado = '-';
                            } else {
                                conteudoFormatado = `${formatarNumero(valor)}g`;
                            }
                        } else if (metrica.key === 'lucroDia') {
                            conteudoFormatado = `${formatarNumero(dados.lucroDia, 2)}g`;
                        } else if (metrica.key === 'tempoItem') {
                            conteudoFormatado = `<span class="tempo-item">${formatarTempoIndividual(valor)}</span>`;
                        } else if (metrica.key === 'tempoTotal') {
                             conteudoFormatado = `<span class="tempo-total">${valor || 'N/A'}</span>`;
                        } else if (metrica.key === 'itensConsumidos') {
                             conteudoFormatado = (valor > 1) ? `<span class="input-note-table">${valor}</span>` : '-';
                        } else {
                            conteudoFormatado = valor;
                        }
                        
                        if (metrica.key === 'lucro') {
                            tdValor.innerHTML = `<span class="${valor >= 0 ? 'lucro-positivo' : 'lucro-negativo'}">${conteudoFormatado}</span>`;
                        } else {
                             tdValor.innerHTML = conteudoFormatado;
                         }
                    } else {
                         tdValor.innerHTML = '-';
                    }
                    row.appendChild(tdValor);
                });
                tbody.appendChild(row);
            }
        });
        
        tableContainer.appendChild(table); // Adiciona a tabela ao contêiner
    }

    // --- 6. INICIALIZAÇÃO (COM FILTROS) ---
     const dadosCarregados = popularCultivos(); // Primeira chamada para popular com filtros padrão
    
    if (dadosCarregados) {
        // Adiciona listener para o formulário
        form.addEventListener('submit', calcularLucro);

        // Adiciona listeners para os NOVOS FILTROS
        // Eles vão repopular a lista de cultivos
        selectEstacao.addEventListener('change', popularCultivos);
        selectTipo.addEventListener('change', popularCultivos);

        // Adiciona listener para o seletor de CULTIVO
        // Apenas atualiza as máquinas visíveis e esconde resultados antigos
        selectCultivo.addEventListener('change', () => {
            atualizarVisibilidadeMaquinas();
            resultadosContainer.style.display = 'none';
        });
    }
});
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const accordionItem = header.parentElement;
        const accordionContent = header.nextElementSibling;
        const isActive = accordionItem.classList.contains('active');

        accordionItem.classList.toggle('active');
        header.setAttribute('aria-expanded', !isActive);

        if (!isActive) {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
        } else {
            accordionContent.style.maxHeight = null;
        }
    });
});