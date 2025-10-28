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
    
let selectEstacao, selectTipo, selectCultivo, resultadosContainer, maquinaFormGroups;
/**
 * Aplica o idioma selecionado a todos os elementos marcados e atualiza a interface.
 * @param {string} lang - O código do idioma a ser aplicado (ex: 'pt', 'en', 'es').
 */
function setLanguage(lang) {
    if (typeof translations === 'undefined') { /*...*/ return; }
    if (!translations[lang]) { /*...*/ lang = 'pt'; }

    // Traduz elementos estáticos
    document.querySelectorAll('[data-translate-key]').forEach(element => {
        const key = element.getAttribute('data-translate-key');
        if (translations[lang][key] !== undefined) {
            element.innerHTML = translations[lang][key];
        } else if (translations['pt'][key] !== undefined) {
            element.innerHTML = translations['pt'][key];
            console.warn(`Translation key "${key}" not found for language "${lang}". Used 'pt'.`);
        } else {
            console.error(`Translation key "${key}" not found in any language.`);
        }
    });

    // Guarda preferência e atualiza HTML lang attribute
    localStorage.setItem('preferredLanguage', lang);
    document.documentElement.lang = lang;

    // Atualiza textos dinâmicos (options dos selects)
    updateDynamicTexts(lang);

    // Atualiza cabeçalhos da tabela (se visível)
    if (document.getElementById('resultados')?.style.display === 'block') {
         updateTableHeaders(lang);
    }

    // Atualiza placeholder do dropdown de cultivos
    updateCropDropdownPlaceholder(lang);

    // --- ADICIONADO: Gerencia a classe 'active' nos botões de idioma ---
    const btnPt = document.getElementById('lang-pt'); // Busca os botões aqui
    const btnEn = document.getElementById('lang-en');
    const btnEs = document.getElementById('lang-es');

    // Remove 'active' de todos os botões encontrados
    if (btnPt) btnPt.classList.remove('active');
    if (btnEn) btnEn.classList.remove('active');
    if (btnEs) btnEs.classList.remove('active');

    // Adiciona 'active' apenas ao botão correto (se ele foi encontrado)
    if (lang === 'pt' && btnPt) btnPt.classList.add('active');
    if (lang === 'en' && btnEn) btnEn.classList.add('active');
    if (lang === 'es' && btnEs) btnEs.classList.add('active');
    // --- FIM DA ADIÇÃO ---

    // Repopula o dropdown de CULTIVOS com os nomes traduzidos
    // (A chamada a popularCultivos() deve vir DEPOIS de definir document.documentElement.lang)
    popularCultivos();
}

function updateDynamicTexts(lang) {
     // 1. VERIFICAR SE translations EXISTE E PEGAR langData
     if (typeof translations === 'undefined') {
         console.error("updateDynamicTexts: translations object not found.");
         return;
     }
     const langData = translations[lang] || translations['pt']; // Usa 'pt' como fallback

     // --- TRADUZIR OPÇÕES DOS SELECTS ---
     // Mapeamento: ID do Select -> Prefixo da Chave de Tradução
     const selectsToTranslate = {
         'filtro-estacao': 'season',
         'filtro-tipo': 'type',
         'profissao': 'profession',
         'qualidade': 'quality',
         'periodo': 'period'
     };

     // Mapeamento: Valor da Opção ('value' do HTML) -> Sufixo para montar a Chave de Tradução
     const optionValueToKeySuffix = {
         // Estação
         'todas': 'All', 'primavera': 'Spring', 'verao': 'Summer', 'outono': 'Fall', 'inverno': 'Winter',
         // Tipo
         'todos': 'All', 'unica': 'Single', 'multipla': 'Multiple',
         // Profissão
         'nenhuma': 'None', 'cultivador': 'Tiller', 'artesao': 'Artisan',
         // Qualidade
         'normal': 'Normal', 'prata': 'Silver', 'ouro': 'Gold', 'iridio': 'Iridium',
         // Período
         '28': '28d', '56': '56d', '84': '84d', '112': '112d'
     };

     // 2. ITERAR PELOS SELECTS A SEREM TRADUZIDOS
     for (const selectId in selectsToTranslate) {
         const selectElement = document.getElementById(selectId);
         if (selectElement) {
             const keyPrefix = selectsToTranslate[selectId]; // Ex: 'season', 'type'

             // 3. ITERAR PELAS OPÇÕES (<option>) DENTRO DO SELECT ATUAL
             for (let i = 0; i < selectElement.options.length; i++) {
                 const option = selectElement.options[i];
                 const optionValue = option.value; // Ex: 'primavera', 'unica', 'nenhuma', '28'
                 let translationKey = '';

                 // 4. MONTAR A CHAVE DE TRADUÇÃO COMPLETA
                 const keySuffix = optionValueToKeySuffix[optionValue]; // Ex: 'Spring', 'Single', 'None', '28d'

                 if (keySuffix) {
                     // Caso especial para período (chave já formatada: period28d)
                     if (keyPrefix === 'period') {
                          translationKey = keyPrefix + keySuffix; // ex: period28d
                     } else {
                          // Monta a chave capitalizando o sufixo: season + Spring -> seasonSpring
                          const capitalizedSuffix = keySuffix.charAt(0).toUpperCase() + keySuffix.slice(1).toLowerCase(); // Garante formato como 'Single', 'Multiple'
                          translationKey = keyPrefix + capitalizedSuffix; // ex: seasonSpring, typeSingle
                     }
                 } else {
                     // Se o valor da opção não estiver no mapeamento, pula para a próxima
                     // console.warn(`No key suffix mapping found for option value: ${optionValue} in select ${selectId}`);
                     continue;
                 }

                 // 5. BUSCAR A TRADUÇÃO E ATUALIZAR O TEXTO DA OPÇÃO
                 if (translationKey && langData[translationKey] !== undefined) {
                     // Se a chave existe e tem tradução no idioma atual, usa a tradução
                     option.textContent = langData[translationKey];
                 } else if (translationKey && translations['pt'][translationKey] !== undefined) {
                     // Fallback: Se não encontrou no idioma atual, tenta usar a tradução em Português
                     option.textContent = translations['pt'][translationKey];
                     console.warn(`Translation for key '${translationKey}' not found in lang '${lang}'. Using 'pt' fallback.`);
                 } else {
                     // Fallback final: Se não encontrou nem em 'pt', mantém o texto original ou loga um erro
                     console.error(`Translation key '${translationKey}' not found for option value '${optionValue}' in select '${selectId}' for any language.`);
                     // Mantém o texto que já estava na opção (geralmente o texto do HTML original)
                 }
             } // Fim loop options
         } else {
              console.warn(`Select element with ID "${selectId}" not found during translation.`);
         }
     } // Fim loop selectsToTranslate
     // --- FIM TRADUÇÃO OPÇÕES ---

     // Atualiza placeholder do select de cultivo (essa parte deve estar funcionando)
     updateCropDropdownPlaceholder(lang);
}


/**
 * Determina o idioma inicial a ser usado (salvo > navegador > padrão).
 * @returns {string} O código do idioma inicial ('pt', 'en', ou 'es').
 */
function getInitialLanguage() {
    // Fallback inicial se translations não carregou
    if (typeof translations === 'undefined') return 'pt';

    // 1. Verifica se já tem um idioma salvo no localStorage
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && translations[savedLang]) {
        return savedLang;
    }
    // 2. Tenta detectar pelo navegador (pega só a parte principal, ex: 'pt' de 'pt-BR')
    const browserLang = navigator.language.split('-')[0];
    if (translations[browserLang]) {
        return browserLang;
    }
    // 3. Usa o padrão ('pt')
    return 'pt';
}



/**
 * Atualiza o texto do placeholder no dropdown de cultivos se ele estiver vazio.
 * @param {string} lang - O código do idioma atual.
 */
function updateCropDropdownPlaceholder(lang) {
    if (typeof translations === 'undefined') return;
    const langData = translations[lang] || translations['pt'];
    const selectCultivo = document.getElementById('cultivo');
    // Verifica se o select existe, tem apenas uma opção, e essa opção está desabilitada
    if (selectCultivo && selectCultivo.options.length === 1 && selectCultivo.options[0].disabled) {
        // Usa a chave 'noCropFound' que adicionamos ao translations.js
        selectCultivo.options[0].textContent = langData['noCropFound'] || 'Nenhum cultivo encontrado';
    }
}

/**
 * Atualiza os textos dos labels das métricas na tabela de resultados.
 * @param {string} lang - O código do idioma atual.
 */
function updateTableHeaders(lang) {
     if (typeof translations === 'undefined') return;
     const langData = translations[lang] || translations['pt'];
     const table = document.querySelector('#detalhes table');
     if (!table) return; // Sai se a tabela não existe (resultados não foram calculados ainda)

     // Atualiza o cabeçalho "Métrica"
     const metricHeaderCell = table.querySelector('thead th:first-child');
     if (metricHeaderCell) {
         // Usa a chave 'metricHeader' que adicionamos ao translations.js
         metricHeaderCell.textContent = langData['metricHeader'] || 'Métrica';
     }

     // Atualiza os labels das linhas (primeira célula de cada linha do tbody)
     const metricRows = table.querySelectorAll('tbody tr');

     metricRows.forEach(row => {
         const labelCell = row.querySelector('td:first-child');
         // Usa a chave guardada no dataset (adicionada em atualizarUI)
         const key = labelCell.dataset.translateKey;

         // Se encontrou a chave, traduz para o idioma atual
         if (key && langData[key]) {
             labelCell.textContent = langData[key];
         } else if (key && translations['pt'][key]) {
             // Fallback para português se não achar no idioma atual mas achar em pt
             labelCell.textContent = translations['pt'][key];
             console.warn(`Metric label key "${key}" translated using fallback 'pt'.`);
         } else if (key) {
             // Fallback se a chave não existir em lugar nenhum
             labelCell.textContent = key; // Mostra a chave como último recurso
             console.error(`Metric label key "${key}" not found in any language.`);
         }
     });
}

// --- FIM FUNÇÕES DE TRADUÇÃO ---
function popularCultivos() {
        // 1. Validar dados
        if (typeof DADOS_CULTURAS === 'undefined' || Object.keys(DADOS_CULTURAS).length === 0) {
             console.error("DADOS_CULTURAS não foi definido ou está vazio.");
             // Consider adding translated alert messages in translations.js
             alert("Erro fatal: Arquivo 'dados_culturas.js' não foi carregado ou está vazio.");
             return false;
        }

        // 2. Obter valores dos filtros e idioma atual
        const estacaoSelecionada = selectEstacao.value;
        const tipoSelecionado = selectTipo.value;
        const currentLang = document.documentElement.lang || 'pt'; // Pega idioma atual do HTML

        // 3. Filtrar os cultivos (lógica inalterada)
        const cultivosFiltrados = Object.entries(DADOS_CULTURAS).filter(([, cultura]) => {
            const estacaoOk = (estacaoSelecionada === 'todas') ||
                              (cultura.estacoes && cultura.estacoes.includes(estacaoSelecionada));
            if (!estacaoOk) return false;
            const tipoOk = (tipoSelecionado === 'todos') ||
                           (tipoSelecionado === 'unica' && cultura.tempo_renovacao === 0) ||
                           (tipoSelecionado === 'multipla' && cultura.tempo_renovacao > 0);
            if (!tipoOk) return false;
            return true;
        });

        // 4. Ordenar os cultivos filtrados USANDO O NOME TRADUZIDO
        const cultivosOrdenados = cultivosFiltrados.sort(([, a], [, b]) => {
            // Pega o nome no idioma atual, com fallback para 'pt' e depois string vazia
            const nomeA = a.nomes?.[currentLang] || a.nomes?.['pt'] || '';
            const nomeB = b.nomes?.[currentLang] || b.nomes?.['pt'] || '';
            // Usa localeCompare para ordenação alfabética correta
            return nomeA.localeCompare(nomeB, currentLang); // Adiciona locale para melhor ordenação
        });

        // 5. Limpar e popular o select de cultivos
        selectCultivo.innerHTML = ''; // Limpa opções antigas

        if (cultivosOrdenados.length === 0) {
            const option = document.createElement('option');
            option.value = '';
            // Usa a tradução para o placeholder "Nenhum cultivo encontrado"
            option.textContent = (typeof translations !== 'undefined' ? translations[currentLang]?.noCropFound || translations['pt'].noCropFound : 'Nenhum cultivo encontrado');
            option.disabled = true;
            selectCultivo.appendChild(option);
        } else {
            for (const [id, cultura] of cultivosOrdenados) {
                const option = document.createElement('option');
                option.value = id;
                // --- MODIFICADO AQUI: Usa o nome traduzido do objeto nomes ---
                // Pega o nome no idioma atual, com fallback para 'pt', depois para o 'id' do cultivo
                option.textContent = cultura.nomes?.[currentLang] || cultura.nomes?.['pt'] || id;
                // --- FIM DA MODIFICAÇÃO ---
                selectCultivo.appendChild(option);
            }
        }

        // 6. Atualizar a UI (máquinas e resultados)
        atualizarVisibilidadeMaquinas();
        resultadosContainer.style.display = 'none';

        // Garante que o placeholder seja atualizado mesmo após repopular
        updateCropDropdownPlaceholder(currentLang);

        return true;
    }
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



document.addEventListener('DOMContentLoaded', () => {

    selectEstacao = document.getElementById('filtro-estacao');
    selectTipo = document.getElementById('filtro-tipo');
    selectCultivo = document.getElementById('cultivo');
    resultadosContainer = document.getElementById('resultados');
    maquinaFormGroups = document.querySelectorAll('.form-group[data-maquina]');
    
    const form = document.getElementById('calc-form');
    const resumoCultivo = document.getElementById('resumo-cultivo');
    const totalSementesEl = document.getElementById('total-sementes');
    const custoTotalEl = document.getElementById('custo-total');
    const totalColheitasEl = document.getElementById('total-colheitas');
    const totalFrutosEl = document.getElementById('total-frutos');
    const detalhesContainer = document.getElementById('detalhes');
    const selectPeriodo = document.getElementById('periodo');
    const custoSementeUnitarioEl = document.getElementById('custo-semente-unitario');
    const precoBaseUnitarioEl = document.getElementById('preco-base-unitario');
    const resumoImagemCultivoEl = document.getElementById('resumo-imagem-cultivo');
        // --- FIM ATRIBUIÇÃO DOM ---
    
    

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
        // Objeto que mapeia o tipoId (a chave interna dos dados)
        // para uma chave de tradução base (sem qualidade)
        const typeIdToTranslationKey = {
            'direta': 'sell',
            'direta_e_mel': 'sellPlusHoney',
            'geleia_picles': 'jar',
            'vinho': 'wine',
            'suco': 'juice',
            'fruta_ressecada': 'dehydrator',
            'oleo': 'oil',
            'pale_ale': 'paleAle',
            'cerveja': 'beer',
            'cafe': 'coffee',
            'cha_verde': 'tea',
            'hidromel': 'mead',
            'vinagre': 'vinegar',
            'passas': 'raisins',
            'mel_de_flor': 'honey',
            'arroz': 'rice'
            // Adicione mais mapeamentos se criar novos tipos de processamento
        };

        // Retorna a chave de tradução mapeada.
        // Se não encontrar no mapeamento, retorna o próprio tipoId como fallback.
        // A lógica para adicionar a qualidade (ex: "(ouro)") foi movida para dentro de 'atualizarUI'.
        return typeIdToTranslationKey[tipoId] || tipoId;
     }
// --- 5. ATUALIZAÇÃO DA INTERFACE (AJUSTADA para TOTAIS DA ESTAÇÃO na Tabela e NOME TRADUZIDO) ---
    function atualizarUI(cultura, inputs, custoRealEstacao, colheitasEstacao, totalFrutosEstacao, resultados, diasCalculo) {
        resultadosContainer.style.display = 'block';
        const currentLang = document.documentElement.lang || 'pt'; // Pega idioma atual

        // --- ATUALIZA RESUMO ---
        // --- MODIFICADO AQUI: Usa nome traduzido no resumo ---
        const nomeCultivoTraduzido = cultura.nomes?.[currentLang] || cultura.nomes?.['pt'] || cultura.nome; // Usa .nome antigo como último fallback
        resumoCultivo.textContent = `${inputs.quantidade}x ${nomeCultivoTraduzido} (${diasCalculo} dias)`;
        // --- FIM DA MODIFICAÇÃO ---

        totalSementesEl.textContent = formatarNumero(inputs.quantidade);
        custoTotalEl.textContent = `${formatarNumero(custoRealEstacao)}g`; // Mostra Custo REAL da estação
        custoSementeUnitarioEl.textContent = `${formatarNumero(cultura.custo_semente)}g`;
        precoBaseUnitarioEl.textContent = `${formatarNumero(cultura.preco_base)}g`;
        totalColheitasEl.textContent = `${formatarNumero(colheitasEstacao)} (colheitas)`; // Texto '(colheitas)' pode precisar de tradução
        totalFrutosEl.textContent = formatarNumero(totalFrutosEstacao);

        const imagemUrl = cultura.imagem_url || '';
        resumoImagemCultivoEl.src = imagemUrl;
        // --- MODIFICADO AQUI: Usa nome traduzido no alt da imagem ---
        resumoImagemCultivoEl.alt = nomeCultivoTraduzido;
        // --- FIM DA MODIFICAÇÃO ---
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
        // Traduz o cabeçalho "Métrica"
        thMetrica.textContent = (typeof translations !== 'undefined' ? translations[currentLang]?.metricHeader || translations['pt'].metricHeader : 'Métrica');
        headerRow.appendChild(thMetrica);

        const colHeaders = [];

        resultadosOrdenados.forEach(([tipoId, dados]) => {
            const thMetodo = document.createElement('th');
            const currentLang = document.documentElement.lang || 'pt'; // Pega idioma atual

            // --- TRADUÇÃO DO CABEÇALHO DO MÉTODO ---
            // 1. Obter a chave de tradução BASE (ex: 'sell', 'jar', 'wine')
            const chaveCabecalhoBase = getNomeCabecalho(tipoId, dados);
            let nomeCabecalhoFinal = chaveCabecalhoBase; // Fallback inicial

            // 2. Buscar a tradução da chave BASE
            const traducaoBase = (typeof translations !== 'undefined' ? translations[currentLang]?.[chaveCabecalhoBase] || translations['pt'][chaveCabecalhoBase] : chaveCabecalhoBase) || chaveCabecalhoBase;

            // 3. Se for Venda Direta, adicionar a qualidade traduzida
            if (tipoId === 'direta' || tipoId === 'direta_e_mel') {
                // Monta a chave da qualidade (ex: qualityNormal, qualitySilver)
                const qualidadeValue = dados.qualidade || 'normal'; // Garante um valor padrão
                const qualidadeKey = `quality${qualidadeValue.charAt(0).toUpperCase() + qualidadeValue.slice(1)}`;
                // Busca a tradução da qualidade
                const qualidadeTraduzida = (typeof translations !== 'undefined' ? translations[currentLang]?.[qualidadeKey] || translations['pt'][qualidadeKey] : qualidadeValue) || qualidadeValue;
                // Combina a tradução base com a qualidade traduzida
                nomeCabecalhoFinal = `${traducaoBase} (${qualidadeTraduzida})`;
            } else {
                // Para outros métodos, usa apenas a tradução base
                nomeCabecalhoFinal = traducaoBase;
            }

            thMetodo.textContent = nomeCabecalhoFinal; // Define o texto do <th>
            // --- FIM TRADUÇÃO CABEÇALHO ---

            thMetodo.classList.add(`th-${tipoId}`);
            headerRow.appendChild(thMetodo);
            colHeaders.push(nomeCabecalhoFinal); // Usa nome final (traduzido com qualidade) para data-label
        });
        thead.appendChild(headerRow);

        // --- MÉTRICAS COM LABELKEY ---
        const metricas = [
            { key: 'totalProdutos', labelKey: 'metricYield' },
            { key: 'receitaTotal', labelKey: 'metricRevenue' },
            { key: 'custoTotal', labelKey: 'metricCost', classe_tr: 'cost-row'},
            { key: 'lucro', labelKey: 'metricProfit', classe_tr: 'profit-row'},
            { key: 'lucroDia', labelKey: 'metricProfitPerDay' },
            { key: 'tempoItem', labelKey: 'metricTimePerItem' },
            { key: 'tempoTotal', labelKey: 'metricTimeTotal'}, // Corrigido: Removido 'Estação' do labelKey
            { key: 'itensConsumidos', labelKey: 'metricItemsPerProcess' }
        ];

        metricas.forEach(metrica => {
            // --- LÓGICA SIMPLIFICADA para exibir a linha ---
            let temMetrica = true; // Assume que a linha deve ser exibida por padrão

            // Condições específicas para ESCONDER a linha INTEIRA:
            if (metrica.key === 'itensConsumidos') {
                // Esconde a linha "Itens p/ Processo" se NENHUM método usar mais de 1 item
                temMetrica = resultadosOrdenados.some(([, dados]) => dados.itensConsumidos && dados.itensConsumidos > 1);
            }
            // (Você pode adicionar outros 'else if' aqui se houver mais linhas que precisam ser condicionalmente ocultadas)

            // --- FIM DA LÓGICA SIMPLIFICADA ---

            if (temMetrica) {
                const row = document.createElement('tr');
                // ... (o resto do código para criar a linha e as células continua como estava) ...
                if (metrica.classe_tr) { row.classList.add(metrica.classe_tr); }
                const tdLabel = document.createElement('td');

                // --- USA TRADUÇÃO DO LABEL ---
                const currentLang = document.documentElement.lang || 'pt';
                tdLabel.textContent = (typeof translations !== 'undefined' ? translations[currentLang]?.[metrica.labelKey] || translations['pt'][metrica.labelKey] : metrica.labelKey);
                tdLabel.dataset.translateKey = metrica.labelKey;
                // --- FIM AJUSTE ---
                row.appendChild(tdLabel);

                // --- Loop interno para preencher os valores (TDs) ---
                resultadosOrdenados.forEach(([tipoId, dados], index) => {
                    // ... (TODA a lógica interna para formatar 'conteudoFormatado'
                    //      incluindo 'Insuficiente' e N/A, permanece EXATAMENTE como estava antes) ...
                    const tdValor = document.createElement('td');
                    tdValor.setAttribute('data-label', colHeaders[index]);
                    let valor = dados[metrica.key];
                    let conteudoFormatado = '';
                    const INDICADOR_INSUFICIENTE = (typeof translations !== 'undefined' ? translations[currentLang]?.insufficient || translations['pt'].insufficient : "Insuficiente");
                    const isDirectSale = tipoId === 'direta' || tipoId === 'direta_e_mel';
                    const isPureHoney = tipoId === 'mel_de_flor';
                    const isProcessingMetricPotentiallyNull = ['totalProdutos', 'receitaTotal', 'lucro', 'tempoTotal'].includes(metrica.key);

                    // Lógica de Exibição (Inalterada)
                    if (valor === null && isProcessingMetricPotentiallyNull && dados.itensConsumidos > 1 && !isDirectSale) { conteudoFormatado = `<span class="insuficiente-nota">${INDICADOR_INSUFICIENTE}</span>`; }
                    else if ((metrica.key === 'tempoTotal' || metrica.key === 'tempoItem') && isDirectSale) { conteudoFormatado = '-'; }
                    else if (metrica.key === 'tempoTotal' && isPureHoney) { conteudoFormatado = dados.tempoTotal ? `<span class="tempo-total">${dados.tempoTotal}</span>` : '-'; }
                    else if (metrica.key === 'custoTotal' && isPureHoney) { conteudoFormatado = '-'; }
                    else if (metrica.key === 'totalProdutos' && isPureHoney) { conteudoFormatado = (valor !== null && typeof valor !== 'undefined') ? formatarNumero(valor) : '-'; }
                    else if (metrica.key === 'totalProdutos' && tipoId === 'direta_e_mel') { conteudoFormatado = (totalFrutosEstacao !== null && typeof totalFrutosEstacao !== 'undefined') ? formatarNumero(totalFrutosEstacao) : '-'; }
                    else if (valor !== null && typeof valor !== 'undefined') {
                        // Formatação dos valores (Inalterada)
                        if (metrica.key === 'totalProdutos') { conteudoFormatado = formatarNumero(valor); }
                        else if (['receitaTotal', 'custoTotal', 'lucro'].includes(metrica.key)) { conteudoFormatado = `${formatarNumero(valor)}g`; }
                        else if (metrica.key === 'lucroDia') { conteudoFormatado = `${formatarNumero(dados.lucroDia, 2)}g`; }
                        else if (metrica.key === 'tempoItem') { conteudoFormatado = (valor >= 0) ? `<span class="tempo-item">${formatarTempoIndividual(valor)}</span>` : '-'; }
                        else if (metrica.key === 'tempoTotal') { conteudoFormatado = `<span class="tempo-total">${valor || 'N/A'}</span>`; }
                        else if (metrica.key === 'itensConsumidos') { conteudoFormatado = (valor > 1) ? `<span class="input-note-table">${valor}</span>` : '-'; }
                        else { conteudoFormatado = valor; }
                    }
                    else { conteudoFormatado = '-'; }

                    // Aplica classes de lucro/negativo ou insere o HTML formatado (Inalterado)
                    if (conteudoFormatado.includes('insuficiente-nota')) { tdValor.innerHTML = conteudoFormatado; }
                    else if (metrica.key === 'lucro' && valor !== null) { tdValor.innerHTML = `<span class="${valor >= 0 ? 'lucro-positivo' : 'lucro-negativo'}">${conteudoFormatado}</span>`; }
                    else { tdValor.innerHTML = conteudoFormatado; }

                    row.appendChild(tdValor);
                }); // --- Fim loop interno ---
                tbody.appendChild(row);
            } // --- Fim if(temMetrica) ---
        });

        tableContainer.appendChild(table);
        // Garante que os cabeçalhos sejam atualizados se a tabela foi recriada
        updateTableHeaders(currentLang);
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
    // --- INICIALIZAÇÃO DA TRADUÇÃO ---
        const initialLang = getInitialLanguage();
        setLanguage(initialLang); // Aplica idioma inicial

        // Adiciona listeners para os botões de idioma
        const btnPt = document.getElementById('lang-pt');
        const btnEn = document.getElementById('lang-en');
        const btnEs = document.getElementById('lang-es');

        if (btnPt) btnPt.addEventListener('click', () => setLanguage('pt'));
        if (btnEn) btnEn.addEventListener('click', () => setLanguage('en'));
        if (btnEs) btnEs.addEventListener('click', () => setLanguage('es'));
        // --- FIM INICIALIZAÇÃO TRADUÇÃO ---
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
