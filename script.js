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

// --- 4. LÓGICA DE CÁLCULO (AJUSTADA para TOTAIS DA ESTAÇÃO na Tabela) ---
    function calcularLucro(event) {
        event.preventDefault();
        const inputs = getInputs();
        if (!inputs.cultivoId || !DADOS_CULTURAS[inputs.cultivoId]) {
            alert("Erro: Nenhum cultivo selecionado ou dados indisponíveis."); return;
        }
        const cultura = DADOS_CULTURAS[inputs.cultivoId];
        const DIAS_CALCULO = inputs.dias;

        // --- CÁLCULOS BASE ---
        // 1. Potencial Total na Estação
        const custoTotalSementesEstacao = cultura.custo_semente * inputs.quantidade; // Custo inicial
        let colheitasPorPlantaEstacao = 0;
        if (cultura.tempo_crescimento > 0) {
            if (cultura.tempo_renovacao > 0) { // Renovável
                if (DIAS_CALCULO >= cultura.tempo_crescimento) {
                    colheitasPorPlantaEstacao = 1 + Math.floor((DIAS_CALCULO - cultura.tempo_crescimento) / cultura.tempo_renovacao);
                }
            } else { // Não Renovável (Ciclos)
                // Ajuste: Calcula colheitas totais na estação (considerando replantio)
                 colheitasPorPlantaEstacao = Math.floor(DIAS_CALCULO / cultura.tempo_crescimento);
            }
        }
        colheitasPorPlantaEstacao = Math.max(0, colheitasPorPlantaEstacao);
        const totalFrutosEstacao = Math.floor(colheitasPorPlantaEstacao * cultura.frutos_por_colheita * inputs.quantidade);

        // 2. Custo Real da Estação (Considera replantio para não renováveis)
        const custoRealEstacao = (cultura.tempo_renovacao === 0 && colheitasPorPlantaEstacao > 0)
                                 ? (cultura.custo_semente * inputs.quantidade * colheitasPorPlantaEstacao)
                                 : custoTotalSementesEstacao;
        // --- FIM CÁLCULOS BASE ---


        // 4.3. Venda Direta (Calculado para a ESTAÇÃO)
        const precoVendaDiretaUnitario = cultura.preco_base * MULTIPLICADOR_QUALIDADE[inputs.qualidade];
        const modProfissaoDireta = (inputs.profissao === 'cultivador') ? 1.1 : 1.0;
        const precoVendaDiretaFinal = precoVendaDiretaUnitario * modProfissaoDireta;

        const receitaDiretaEstacao = precoVendaDiretaFinal * totalFrutosEstacao;
        const lucroDiretoEstacao = receitaDiretaEstacao - custoRealEstacao; // Usa custo real
        const lucroDiaDiretoEstacao = (DIAS_CALCULO > 0) ? (lucroDiretoEstacao / DIAS_CALCULO) : 0;

        const resultados = {
            'direta': {
                nome: `Venda Direta`,
                qualidade: inputs.qualidade,
                totalProdutos: totalFrutosEstacao, // Produtos da ESTAÇÃO
                receitaTotal: receitaDiretaEstacao, // Receita da ESTAÇÃO
                custoTotal: custoRealEstacao,     // Custo REAL da ESTAÇÃO
                lucro: lucroDiretoEstacao,        // Lucro da ESTAÇÃO
                lucroDia: lucroDiaDiretoEstacao,  // Lucro/Dia MÉDIO da estação
                tempoTotal: null, // Venda é instantânea
                tempoItem: null,
                itensConsumidos: 1
            }
        };

        // 4.4. Produtos Artesanais (Calculado para a ESTAÇÃO)
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

            // Produtos, Receita e Lucro da ESTAÇÃO INTEIRA
            const totalProdutosFeitosEstacao = Math.floor(totalFrutosEstacao / itensConsumidos);
            const receitaArtesanalEstacao = precoUnitarioFinal * totalProdutosFeitosEstacao;
            const lucroArtesanalEstacao = receitaArtesanalEstacao - custoRealEstacao; // Usa custo real
            const lucroDiaArtesanalEstacao = (DIAS_CALCULO > 0) ? (lucroArtesanalEstacao / DIAS_CALCULO) : 0;

             // Tempo total baseado nos produtos da ESTAÇÃO
             let tempoProcessamentoTotalEstacao = "N/A";
             if (totalProdutosFeitosEstacao > 0) {
                let numMaquinasParaProduto = 0;
                switch (produtoInfo.maquina) {
                    case 'jarra': numMaquinasParaProduto = inputs.maquinas.jarra; break;
                    case 'barril': numMaquinasParaProduto = inputs.maquinas.barril; break;
                    case 'desidratador': numMaquinasParaProduto = inputs.maquinas.desidratador; break;
                    case 'oleo': numMaquinasParaProduto = inputs.maquinas.oleo; break;
                    default: numMaquinasParaProduto = 0;
                }
                tempoProcessamentoTotalEstacao = calcularTempoProcessamento(totalProdutosFeitosEstacao, numMaquinasParaProduto, produtoInfo.tempo_min);
            } else {
                 // Se não produz nada na estação (ex: desidratador com poucos frutos)
                 tempoProcessamentoTotalEstacao = (itensConsumidos > 1) ? null : "N/A"; // Usa null para indicar 'Insuficiente'
            }


            resultados[tipoId] = {
                nome: produtoInfo.nome,
                totalProdutos: totalProdutosFeitosEstacao > 0 ? totalProdutosFeitosEstacao : (itensConsumidos > 1 ? null : 0), // Produtos da ESTAÇÃO (null se insuficiente)
                receitaTotal: totalProdutosFeitosEstacao > 0 ? receitaArtesanalEstacao : (itensConsumidos > 1 ? null : 0),    // Receita da ESTAÇÃO (null se insuficiente)
                custoTotal: custoRealEstacao,     // Custo REAL da ESTAÇÃO
                lucro: totalProdutosFeitosEstacao > 0 ? lucroArtesanalEstacao : (itensConsumidos > 1 ? null : -custoRealEstacao), // Lucro da ESTAÇÃO (null se insuficiente, ou negativo se produz 0)
                lucroDia: lucroDiaArtesanalEstacao,   // Lucro/Dia MÉDIO da estação
                tempoTotal: tempoProcessamentoTotalEstacao, // Tempo para processar TUDO (null se insuficiente)
                tempoItem: produtoInfo.tempo_min,
                itensConsumidos: itensConsumidos
            };
        }

        // 4.5. Mel (Cálculos já são baseados na estação)
        if (cultura.produtos_artesanais.mel_de_flor && inputs.maquinas.apiario > 0) {
            const produtoInfo = PRODUTOS_ARTESANAIS_INFO['mel_de_flor'];
            const produtoPrecos = cultura.produtos_artesanais.mel_de_flor;
            const colheitasDeMel = Math.floor(DIAS_CALCULO / 4);
            const totalMel = colheitasDeMel * inputs.maquinas.apiario;
            let precoMelUnitario = (inputs.profissao === 'artesao') ? produtoPrecos.artesao : produtoPrecos.base;
            const receitaMel = totalMel * precoMelUnitario;
            const lucroMel = receitaMel;
            const lucroDiaMel = (DIAS_CALCULO > 0) ? (lucroMel / DIAS_CALCULO) : 0;

            // Venda Direta + Mel (Resultados da ESTAÇÃO)
            resultados['direta_e_mel'] = {
                nome: `Venda Direta + Mel`,
                qualidade: inputs.qualidade,
                totalProdutos: totalFrutosEstacao, // Frutos da estação
                receitaTotal: receitaDiretaEstacao + receitaMel, // Receita total estação
                custoTotal: custoRealEstacao, // Custo real da estação (flor)
                lucro: lucroDiretoEstacao + lucroMel,    // Lucro total estação
                lucroDia: lucroDiaDiretoEstacao + lucroDiaMel, // Lucro/Dia estação
                tempoTotal: null,
                tempoItem: null,
                itensConsumidos: 1
            };
             // Apenas Mel (Resultados da ESTAÇÃO)
             resultados['mel_de_flor'] = {
                nome: `Apenas Mel`,
                totalProdutos: totalMel, // Total de mel na estação
                receitaTotal: receitaMel, // Receita total estação
                custoTotal: 0, // Custo está na flor (já contabilizado em direta_e_mel)
                lucro: lucroMel,        // Lucro total estação
                lucroDia: lucroDiaMel,    // Lucro/Dia estação
                tempoTotal: `~4 dias/colheita`, // Tempo do ciclo do mel
                tempoItem: produtoInfo.tempo_min, // Tempo por colheita do apiário
                itensConsumidos: 1
            };
        }

        // Passa custo REAL da estação e TOTAIS da estação para UI
        atualizarUI(cultura, inputs, custoRealEstacao, colheitasPorPlantaEstacao, totalFrutosEstacao, resultados, DIAS_CALCULO);
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

// --- 5. ATUALIZAÇÃO DA INTERFACE (AJUSTADA para TOTAIS DA ESTAÇÃO na Tabela) ---
    function atualizarUI(cultura, inputs, custoRealEstacao, colheitasEstacao, totalFrutosEstacao, resultados, diasCalculo) {
        resultadosContainer.style.display = 'block';

        // --- ATUALIZA RESUMO ---
        resumoCultivo.textContent = `${inputs.quantidade}x ${cultura.nome} (${diasCalculo} dias)`;
        totalSementesEl.textContent = formatarNumero(inputs.quantidade);
        custoTotalEl.textContent = `${formatarNumero(custoRealEstacao)}g`; // Mostra Custo REAL da estação
        custoSementeUnitarioEl.textContent = `${formatarNumero(cultura.custo_semente)}g`;
        precoBaseUnitarioEl.textContent = `${formatarNumero(cultura.preco_base)}g`;
        totalColheitasEl.textContent = `${formatarNumero(colheitasEstacao)} (colheitas)`;
        // Total de Frutos no resumo agora sempre mostra o total da estação
        totalFrutosEl.textContent = formatarNumero(totalFrutosEstacao);

        const imagemUrl = cultura.imagem_url || '';
        resumoImagemCultivoEl.src = imagemUrl;
        resumoImagemCultivoEl.alt = cultura.nome;
        resumoImagemCultivoEl.style.display = imagemUrl ? 'inline-block' : 'none';

        // --- CRIA TABELA ---
        detalhesContainer.innerHTML = '';
        const tableContainer = document.createElement('div');
        tableContainer.className = 'table-container';
        detalhesContainer.appendChild(tableContainer);

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        table.appendChild(thead);
        table.appendChild(tbody);

        const resultadosOrdenados = Object.entries(resultados).sort(([, a], [, b]) => b.lucroDia - a.lucroDia);
        const headerRow = document.createElement('tr');
        const thMetrica = document.createElement('th');
        thMetrica.textContent = 'Métrica';
        headerRow.appendChild(thMetrica);

        const colHeaders = [];

        resultadosOrdenados.forEach(([tipoId, dados]) => {
            const thMetodo = document.createElement('th');
            const nomeCabecalho = getNomeCabecalho(tipoId, dados);
            thMetodo.textContent = nomeCabecalho;
            thMetodo.classList.add(`th-${tipoId}`);
            headerRow.appendChild(thMetodo);
            colHeaders.push(nomeCabecalho);
        });
        thead.appendChild(headerRow);

        // --- NOMES DAS MÉTRICAS ATUALIZADOS ---
        const metricas = [
            { key: 'totalProdutos', label: 'Rendimento (Estação)' },
            { key: 'receitaTotal', label: 'Receita (Estação)' },
            { key: 'custoTotal', label: 'Custo (Estação)', classe_tr: 'cost-row'}, // Custo total da estação
            { key: 'lucro', label: 'Lucro (Estação)', classe_tr: 'profit-row'},    // Lucro total da estação
            { key: 'lucroDia', label: 'Lucro por Dia' },    // Média diária
            { key: 'tempoItem', label: 'Tempo por Item' },
            { key: 'tempoTotal', label: 'Tempo Total'}, // Tempo para processar TUDO
            { key: 'itensConsumidos', label: 'Itens p/ Processo' }
        ];

        metricas.forEach(metrica => {
            // Lógica para exibir a linha (simplificada, pois a maioria dos valores deve existir agora)
             let temMetrica = resultadosOrdenados.some(([, dados]) => {
                const valor = dados[metrica.key];
                // Itens p/ Processo só mostra se for > 1 em algum método
                if (metrica.key === 'itensConsumidos') return dados.itensConsumidos && dados.itensConsumidos > 1;
                 // Tempo por item só mostra se for > 0 em algum método
                if (metrica.key === 'tempoItem') return dados.tempoItem !== null && dados.tempoItem > 0;
                 // Rendimento não mostra para Mel Puro
                if (metrica.key === 'totalProdutos' && dados.nome === 'Apenas Mel') return false;
                 // Custo não mostra para Mel Puro
                 if (metrica.key === 'custoTotal' && dados.nome === 'Apenas Mel') return false;
                 // Tempo Total não mostra para Venda e Mel Puro
                if (metrica.key === 'tempoTotal' && (dados.nome === 'Venda Direta' || dados.nome === 'Venda Direta + Mel' || dados.nome === 'Apenas Mel')) return false;

                // Para as outras métricas, verifica se o valor não é null/undefined
                return valor !== null && typeof valor !== 'undefined';
            });

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
                    const INDICADOR_INSUFICIENTE = "Insuficiente";
                    const isDirectSale = tipoId === 'direta' || tipoId === 'direta_e_mel';
                    const isPureHoney = tipoId === 'mel_de_flor';
                    const isProcessingMetricPotentiallyNull = ['totalProdutos', 'receitaTotal', 'lucro', 'tempoTotal'].includes(metrica.key);


                    // --- LÓGICA DE EXIBIÇÃO CORRIGIDA ---

                    // 1. Verifica caso específico de "Insuficiente"
                    // (Valor é null, é métrica de processamento, requer >1 item, E NÃO é venda direta)
                    if (valor === null && isProcessingMetricPotentiallyNull && dados.itensConsumidos > 1 && !isDirectSale) {
                        conteudoFormatado = `<span class="insuficiente-nota">${INDICADOR_INSUFICIENTE}</span>`;
                    }
                    // 2. Trata outros casos onde '-' é esperado (mesmo se valor for null ou 0)
                    else if ((metrica.key === 'tempoTotal' || metrica.key === 'tempoItem') && isDirectSale) {
                         conteudoFormatado = '-'; // Tempo não aplicável à venda
                    } else if (metrica.key === 'tempoTotal' && isPureHoney) {
                         conteudoFormatado = '-'; // Tempo Total não aplicável a Mel Puro isolado (usa o texto ~4dias)
                         if (dados.tempoTotal) { // A menos que tenhamos um texto específico como "~4 dias/colheita"
                              conteudoFormatado = `<span class="tempo-total">${dados.tempoTotal}</span>`;
                         }
                    } else if (metrica.key === 'custoTotal' && isPureHoney) {
                         conteudoFormatado = '-'; // Custo não aplicável a Mel Puro isolado
                    } else if (metrica.key === 'totalProdutos' && isPureHoney) {
                         // Mostra o total de mel se o valor existir
                         conteudoFormatado = (valor !== null && typeof valor !== 'undefined') ? formatarNumero(valor) : '-';
                    } else if (metrica.key === 'totalProdutos' && tipoId === 'direta_e_mel') {
                         // Mostra o total de frutos para Venda+Mel
                          conteudoFormatado = (totalFrutosEstacao !== null && typeof totalFrutosEstacao !== 'undefined') ? formatarNumero(totalFrutosEstacao) : '-';
                    }
                    // 3. Formata valores válidos (não nulos/undefined) para os casos restantes
                    else if (valor !== null && typeof valor !== 'undefined') {
                        if (metrica.key === 'totalProdutos') {
                             conteudoFormatado = formatarNumero(valor);
                        } else if (metrica.key === 'receitaTotal' || metrica.key === 'custoTotal' || metrica.key === 'lucro') {
                            conteudoFormatado = `${formatarNumero(valor)}g`;
                        } else if (metrica.key === 'lucroDia') {
                            conteudoFormatado = `${formatarNumero(dados.lucroDia, 2)}g`;
                        } else if (metrica.key === 'tempoItem') {
                             // Mostra "Instantâneo" se tempo for 0, senão formata
                            conteudoFormatado = (valor >= 0) ? `<span class="tempo-item">${formatarTempoIndividual(valor)}</span>` : '-';
                        } else if (metrica.key === 'tempoTotal') {
                              // Se chegou aqui, é um tempo de processamento válido
                              conteudoFormatado = `<span class="tempo-total">${valor || 'N/A'}</span>`;
                        } else if (metrica.key === 'itensConsumidos') {
                             conteudoFormatado = (valor > 1) ? `<span class="input-note-table">${valor}</span>` : '-';
                        } else {
                            conteudoFormatado = valor; // Caso genérico
                        }
                    }
                    // 4. Fallback final para qualquer outro null/undefined
                    else {
                         conteudoFormatado = '-';
                    }
                    // --- FIM LÓGICA DE EXIBIÇÃO ---


                    // Aplica classes de lucro/negativo ou insere o HTML formatado
                    if (conteudoFormatado.includes('insuficiente-nota')) {
                        tdValor.innerHTML = conteudoFormatado;
                    } else if (metrica.key === 'lucro' && valor !== null) { // Só aplica classe se valor não for null
                        tdValor.innerHTML = `<span class="${valor >= 0 ? 'lucro-positivo' : 'lucro-negativo'}">${conteudoFormatado}</span>`;
                    } else {
                         tdValor.innerHTML = conteudoFormatado;
                     }
                    row.appendChild(tdValor);
                }); // Fim
                tbody.appendChild(row);
            }
        });

        tableContainer.appendChild(table);
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
