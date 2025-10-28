// ARQUIVO DE DADOS MANUAL - VERSÃO COMPLETA E ORGANIZADA COM TRADUÇÕES
const DADOS_CULTURAS = {

    // =============================
    // --- CULTIVOS DE PRIMAVERA ---
    // =============================

    // Colheita Única
    "couve_flor": {
        "nomes": { "pt": "Couve-flor", "en": "Cauliflower", "es": "Coliflor" },
        "custo_semente": 80, "tempo_crescimento": 12, "tempo_renovacao": 0, "preco_base": 175, "frutos_por_colheita": 1.0, "estacoes": ["primavera"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/a/aa/Cauliflower.png",
        "produtos_artesanais": { "geleia_picles": {"base": 393, "artesao": 550}, "suco": {"base": 400, "artesao": 560} }
    },
    "alho": {
        "nomes": { "pt": "Alho", "en": "Garlic", "es": "Ajo" },
        "custo_semente": 40, "tempo_crescimento": 4, "tempo_renovacao": 0, "preco_base": 60, "frutos_por_colheita": 1.0, "estacoes": ["primavera"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/c/cc/Garlic.png",
        "produtos_artesanais": { "geleia_picles": {"base": 135, "artesao": 189}, "suco": {"base": 170, "artesao": 238} }
    },
    "couve": {
        "nomes": { "pt": "Couve", "en": "Kale", "es": "Col rizada" },
        "custo_semente": 70, "tempo_crescimento": 6, "tempo_renovacao": 0, "preco_base": 110, "frutos_por_colheita": 1.0, "estacoes": ["primavera"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/d/d1/Kale.png",
        "produtos_artesanais": { "geleia_picles": {"base": 247, "artesao": 345}, "suco": {"base": 270, "artesao": 378} }
    },
    "batata": {
        "nomes": { "pt": "Batata", "en": "Potato", "es": "Patata" },
        "custo_semente": 50, "tempo_crescimento": 6, "tempo_renovacao": 0, "preco_base": 80, "frutos_por_colheita": 1.0, "estacoes": ["primavera"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/c/c2/Potato.png",
        "produtos_artesanais": { "geleia_picles": {"base": 180, "artesao": 252}, "suco": {"base": 210, "artesao": 294} }
    },
    "ruibarbo": {
        "nomes": { "pt": "Ruibarbo", "en": "Rhubarb", "es": "Ruibarbo" },
        "custo_semente": 100, "tempo_crescimento": 13, "tempo_renovacao": 0, "preco_base": 220, "frutos_por_colheita": 1.0, "estacoes": ["primavera"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/6/6e/Rhubarb.png",
        "produtos_artesanais": { "vinho": {"base": 660, "artesao": 924}, "geleia_picles": {"base": 490, "artesao": 686}, "fruta_ressecada": {"base": 1675, "artesao": 2345} }
    },
    "arroz_nao_moido": {
        "nomes": { "pt": "Arroz não moído", "en": "Unmilled Rice", "es": "Arroz sin moler" },
        "custo_semente": 40, "tempo_crescimento": 6, "tempo_renovacao": 0, "preco_base": 30, "frutos_por_colheita": 1.0, "estacoes": ["primavera"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/f/fe/Unmilled_Rice.png",
        "produtos_artesanais": { "geleia_picles": {"base": 67, "artesao": 93}, "suco": {"base": 110, "artesao": 154}, "vinagre": {"base": 100, "artesao": 100} }
    },
    "cenoura": {
        "nomes": { "pt": "Cenoura", "en": "Carrot", "es": "Zanahoria" },
        "custo_semente": 0, "tempo_crescimento": 3, "tempo_renovacao": 0, "preco_base": 35, "frutos_por_colheita": 1.0, "estacoes": ["primavera"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/c/c3/Carrot.png",
        "produtos_artesanais": { "geleia_picles": {"base": 78, "artesao": 109}, "suco": {"base": 120, "artesao": 168} }
    },
    "tulipa": {
        "nomes": { "pt": "Tulipa", "en": "Tulip", "es": "Tulipán" },
        "custo_semente": 20, "tempo_crescimento": 6, "tempo_renovacao": 0, "preco_base": 30, "frutos_por_colheita": 1.0, "estacoes": ["primavera"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/c/cf/Tulip.png",
        "produtos_artesanais": { "mel_de_flor": {"base": 160, "artesao": 224} }
    },
    "jasmim_azul": {
        "nomes": { "pt": "Jasmim-azul", "en": "Blue Jazz", "es": "Jazz azul" },
        "custo_semente": 30, "tempo_crescimento": 7, "tempo_renovacao": 0, "preco_base": 50, "frutos_por_colheita": 1.0, "estacoes": ["primavera"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/2/2f/Blue_Jazz.png",
        "produtos_artesanais": { "mel_de_flor": {"base": 200, "artesao": 280} }
    },
    // Colheita Múltipla (Primavera)
    "morango": {
        "nomes": { "pt": "Morango", "en": "Strawberry", "es": "Fresa" },
        "custo_semente": 100, "tempo_crescimento": 8, "tempo_renovacao": 5, // Revertido de 4 para 5 (valor original do user)
        "preco_base": 120, "frutos_por_colheita": 1.0, "estacoes": ["primavera"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/6/6d/Strawberry.png",
        "produtos_artesanais": { "vinho": {"base": 360, "artesao": 504}, "geleia_picles": {"base": 290, "artesao": 406}, "fruta_ressecada": {"base": 925, "artesao": 1295} }
    },
    "vagem": {
        "nomes": { "pt": "Vagem", "en": "Green Bean", "es": "Judía verde" },
        "custo_semente": 60, "tempo_crescimento": 11, // Revertido de 10 para 11 (valor original do user)
         "tempo_renovacao": 3, "preco_base": 40, "frutos_por_colheita": 1.0, "estacoes": ["primavera"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/5/5c/Green_Bean.png",
        "produtos_artesanais": { "geleia_picles": {"base": 90, "artesao": 126}, "suco": {"base": 130, "artesao": 182} }
    },
    // Coleta (Primavera)
    "cebolinha": {
        "nomes": { "pt": "Cebolinha", "en": "Spring Onion", "es": "Cebolleta" },
        "custo_semente": 0, "tempo_crescimento": 0, "tempo_renovacao": 0, "preco_base": 8, "frutos_por_colheita": 1.0, "estacoes": ["primavera"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/0/0c/Spring_Onion.png",
        "produtos_artesanais": { "geleia_picles": {"base": 18, "artesao": 25}, "suco": {"base": 66, "artesao": 92} }
    },
    "amora_silvestre": {
        "nomes": { "pt": "Amora-silvestre", "en": "Salmonberry", "es": "Zarzamora de primavera" },
        "custo_semente": 0, "tempo_crescimento": 0, "tempo_renovacao": 0, "preco_base": 5, "frutos_por_colheita": 1.0, "estacoes": ["primavera"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/5/59/Salmonberry.png",
        "produtos_artesanais": { "vinho": {"base": 15, "artesao": 21}, "geleia_picles": {"base": 60, "artesao": 84}, "fruta_ressecada": {"base": 62, "artesao": 86} }
    },
    "morel": {
        "nomes": { "pt": "Morel", "en": "Morel", "es": "Morilla" },
        "custo_semente": 0, "tempo_crescimento": 0, "tempo_renovacao": 0, "preco_base": 150, "frutos_por_colheita": 1.0, "estacoes": ["primavera"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/b/b1/Morel.png",
        "produtos_artesanais": { "geleia_picles": {"base": 350, "artesao": 490}, "oleo": {"base": 1150, "artesao": 1610} }
    },

    // ========================
    // --- CULTIVOS DE VERÃO ---
    // ========================

    // Colheita Única
    "repolho_roxo": {
        "nomes": { "pt": "Repolho roxo", "en": "Red Cabbage", "es": "Col lombarda" },
        "custo_semente": 100, "tempo_crescimento": 9, "tempo_renovacao": 0, "preco_base": 260, "frutos_por_colheita": 1.0, "estacoes": ["verao"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/2/2d/Red_Cabbage.png",
        "produtos_artesanais": { "geleia_picles": {"base": 585, "artesao": 819}, "suco": {"base": 570, "artesao": 798} }
    },
    "carambola": {
        "nomes": { "pt": "Carambola", "en": "Starfruit", "es": "Fruta estrella" },
        "custo_semente": 400, "tempo_crescimento": 13, "tempo_renovacao": 0, "preco_base": 750, "frutos_por_colheita": 1.0, "estacoes": ["verao"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/d/db/Starfruit.png",
        "produtos_artesanais": { "vinho": {"base": 2250, "artesao": 3150}, "geleia_picles": {"base": 1550, "artesao": 2170}, "fruta_ressecada": {"base": 5650, "artesao": 7910} }
    },
    "rabanete": {
        "nomes": { "pt": "Rabanete", "en": "Radish", "es": "Rábano" },
        "custo_semente": 40, "tempo_crescimento": 6, "tempo_renovacao": 0, "preco_base": 90, "frutos_por_colheita": 1.0, "estacoes": ["verao"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/d/d5/Radish.png",
        "produtos_artesanais": { "geleia_picles": {"base": 202, "artesao": 282}, "suco": {"base": 230, "artesao": 322} }
    },
    "papoula": {
        "nomes": { "pt": "Papoula", "en": "Poppy", "es": "Amapola" },
        "custo_semente": 100, "tempo_crescimento": 7, "tempo_renovacao": 0, "preco_base": 140, "frutos_por_colheita": 1.0, "estacoes": ["verao"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/3/37/Poppy.png",
        "produtos_artesanais": { "mel_de_flor": {"base": 380, "artesao": 532} }
    },
    "flor_micanga": {
        "nomes": { "pt": "Flor-Miçanga", "en": "Summer Spangle", "es": "Flor de verano" },
        "custo_semente": 50, "tempo_crescimento": 8, "tempo_renovacao": 0, "preco_base": 90, "frutos_por_colheita": 1.0, "estacoes": ["verao"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/9/9f/Summer_Spangle.png",
        "produtos_artesanais": { "mel_de_flor": {"base": 280, "artesao": 392} }
    },
    // Colheita Múltipla (Verão)
    "mirtilo": {
        "nomes": { "pt": "Mirtilo", "en": "Blueberry", "es": "Arándano azul" },
        "custo_semente": 80, "tempo_crescimento": 13, "tempo_renovacao": 4, "preco_base": 50, "frutos_por_colheita": 3.0, "estacoes": ["verao"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/9/9e/Blueberry.png",
        "produtos_artesanais": { "vinho": {"base": 150, "artesao": 210}, "geleia_picles": {"base": 150, "artesao": 210}, "fruta_ressecada": {"base": 400, "artesao": 560} }
    },
    "lupulo": {
        "nomes": { "pt": "Lúpulo", "en": "Hops", "es": "Lúpulo" },
        "custo_semente": 60, "tempo_crescimento": 12, // Revertido para 12 (valor original do user)
         "tempo_renovacao": 1, "preco_base": 25, "frutos_por_colheita": 1.0, "estacoes": ["verao"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/5/59/Hops.png",
        "produtos_artesanais": { "pale_ale": {"base": 300, "artesao": 420}, "geleia_picles": {"base": 100, "artesao": 140} }
    },
    "abobrinha_de_verao": {
        "nomes": { "pt": "Abobrinha de Verão", "en": "Summer Squash", "es": "Calabacín de verano" },
        "custo_semente": 0, "tempo_crescimento": 6, "tempo_renovacao": 3, "preco_base": 45, "frutos_por_colheita": 1.0, "estacoes": ["verao"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/4/43/Summer_Squash.png",
        "produtos_artesanais": { "geleia_picles": {"base": 101, "artesao": 141}, "suco": {"base": 140, "artesao": 196} }
    },
    "tomate": {
        "nomes": { "pt": "Tomate", "en": "Tomato", "es": "Tomate" },
        "custo_semente": 50, "tempo_crescimento": 11, "tempo_renovacao": 4, "preco_base": 60, "frutos_por_colheita": 1.0, "estacoes": ["verao"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/9/9d/Tomato.png",
        "produtos_artesanais": { "geleia_picles": {"base": 135, "artesao": 189}, "suco": {"base": 170, "artesao": 238} }
    },
    "pimenta_quente": {
        "nomes": { "pt": "Pimenta quente", "en": "Hot Pepper", "es": "Pimiento picante" },
        "custo_semente": 40, "tempo_crescimento": 5, "tempo_renovacao": 3, "preco_base": 40, "frutos_por_colheita": 1.0, "estacoes": ["verao"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/f/f1/Hot_Pepper.png",
        "produtos_artesanais": { "vinho": {"base": 120, "artesao": 168}, "geleia_picles": {"base": 130, "artesao": 182}, "fruta_ressecada": {"base": 325, "artesao": 455} }
    },
    // Coleta (Verão)
    "cafe_de_jardim": {
        "nomes": { "pt": "Café de jardim", "en": "Spice Berry", "es": "Baya especiada" },
        "custo_semente": 0, "tempo_crescimento": 0, "tempo_renovacao": 0, "preco_base": 80, "frutos_por_colheita": 1.0, "estacoes": ["verao"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/c/c6/Spice_Berry.png",
        "produtos_artesanais": { "vinho": {"base": 240, "artesao": 336}, "geleia_picles": {"base": 210, "artesao": 294}, "fruta_ressecada": {"base": 625, "artesao": 875} }
    },
    "broto_de_samambaia": {
        "nomes": { "pt": "Broto de samambaia", "en": "Fiddlehead Fern", "es": "Brote de helecho" },
        "custo_semente": 0, "tempo_crescimento": 0, "tempo_renovacao": 0, "preco_base": 90, "frutos_por_colheita": 1.0, "estacoes": ["verao"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/4/48/Fiddlehead_Fern.png",
        "produtos_artesanais": { "geleia_picles": {"base": 202, "artesao": 282}, "suco": {"base": 230, "artesao": 322} }
    },

    // ==========================
    // --- CULTIVOS DE OUTONO ---
    // ==========================

    // Colheita Única
    "abobora": {
        "nomes": { "pt": "Abóbora", "en": "Pumpkin", "es": "Calabaza" },
        "custo_semente": 100, "tempo_crescimento": 13, "tempo_renovacao": 0, "preco_base": 320, "frutos_por_colheita": 1.0, "estacoes": ["outono"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/6/64/Pumpkin.png",
        "produtos_artesanais": { "geleia_picles": {"base": 720, "artesao": 1008}, "suco": {"base": 690, "artesao": 966} }
    },
    "inhame": {
        "nomes": { "pt": "Inhame", "en": "Yam", "es": "Ñame" },
        "custo_semente": 60, "tempo_crescimento": 10, "tempo_renovacao": 0, "preco_base": 160, "frutos_por_colheita": 1.0, "estacoes": ["outono"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/5/52/Yam.png",
        "produtos_artesanais": { "geleia_picles": {"base": 360, "artesao": 504}, "suco": {"base": 370, "artesao": 518} }
    },
    "cereja_de_joia_doce": {
        "nomes": { "pt": "Cereja de Joia Doce", "en": "Sweet Gem Berry", "es": "Baya gema dulce" },
        "custo_semente": 1000, "tempo_crescimento": 24, "tempo_renovacao": 0, "preco_base": 3000, "frutos_por_colheita": 1.0, "estacoes": ["outono"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/8/88/Sweet_Gem_Berry.png",
        "produtos_artesanais": {}
    },
    "amaranto": {
        "nomes": { "pt": "Amaranto", "en": "Amaranth", "es": "Amaranto" },
        "custo_semente": 70, "tempo_crescimento": 7, "tempo_renovacao": 0, "preco_base": 150, "frutos_por_colheita": 1.0, "estacoes": ["outono"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/f/f6/Amaranth.png",
        "produtos_artesanais": { "geleia_picles": {"base": 337, "artesao": 471}, "suco": {"base": 350, "artesao": 490} }
    },
    "alcachofra": {
        "nomes": { "pt": "Alcachofra", "en": "Artichoke", "es": "Alcachofa" },
        "custo_semente": 30, "tempo_crescimento": 8, "tempo_renovacao": 0, "preco_base": 160, "frutos_por_colheita": 1.0, "estacoes": ["outono"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/d/dd/Artichoke.png",
        "produtos_artesanais": { "geleia_picles": {"base": 360, "artesao": 504}, "suco": {"base": 370, "artesao": 518} }
    },
    "beterraba": {
        "nomes": { "pt": "Beterraba", "en": "Beet", "es": "Remolacha" },
        "custo_semente": 20, "tempo_crescimento": 6, "tempo_renovacao": 0, "preco_base": 100, "frutos_por_colheita": 1.0, "estacoes": ["outono"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/a/a4/Beet.png",
        "produtos_artesanais": { "geleia_picles": {"base": 225, "artesao": 315}, "suco": {"base": 250, "artesao": 350} }
    },
    "rosa_de_fada": {
        "nomes": { "pt": "Rosa-de-fada", "en": "Fairy Rose", "es": "Rosa de hada" },
        "custo_semente": 200, "tempo_crescimento": 12, "tempo_renovacao": 0, "preco_base": 290, "frutos_por_colheita": 1.0, "estacoes": ["outono"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/3/3d/Fairy_Rose.png",
        "produtos_artesanais": { "mel_de_flor": {"base": 680, "artesao": 952} }
    },
    "couve_chinesa": {
        "nomes": { "pt": "Couve chinesa", "en": "Bok Choy", "es": "Col china" },
        "custo_semente": 50, "tempo_crescimento": 4, "tempo_renovacao": 0, "preco_base": 80, "frutos_por_colheita": 1.0, "estacoes": ["outono"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/4/40/Bok_Choy.png",
        "produtos_artesanais": { "geleia_picles": {"base": 180, "artesao": 252}, "suco": {"base": 210, "artesao": 294} }
    },
    // Colheita Múltipla (Outono)
    "oxicoco": {
        "nomes": { "pt": "Oxicoco", "en": "Cranberries", "es": "Arándano rojo" },
        "custo_semente": 240, "tempo_crescimento": 7, "tempo_renovacao": 5, "preco_base": 75, "frutos_por_colheita": 2.0, "estacoes": ["outono"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/6/6e/Cranberries.png",
        "produtos_artesanais": { "vinho": {"base": 225, "artesao": 315}, "geleia_picles": {"base": 200, "artesao": 280}, "fruta_ressecada": {"base": 587, "artesao": 821} }
    },
    "berinjela": {
        "nomes": { "pt": "Berinjela", "en": "Eggplant", "es": "Berenjena" },
        "custo_semente": 20, "tempo_crescimento": 5, "tempo_renovacao": 5, "preco_base": 60, "frutos_por_colheita": 1.0, "estacoes": ["outono"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/8/8f/Eggplant.png",
        "produtos_artesanais": { "geleia_picles": {"base": 135, "artesao": 189}, "suco": {"base": 170, "artesao": 238} }
    },
    "brocolis": {
        "nomes": { "pt": "Brócolis", "en": "Broccoli", "es": "Brócoli" },
        "custo_semente": 0, "tempo_crescimento": 8, "tempo_renovacao": 5, // Revertido para 5 (valor original do user)
         "preco_base": 70, "frutos_por_colheita": 1.0, "estacoes": ["outono"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/f/f1/Broccoli.png",
        "produtos_artesanais": { "geleia_picles": {"base": 157, "artesao": 219}, "suco": {"base": 190, "artesao": 266} }
    },
    "uva": {
        "nomes": { "pt": "Uva", "en": "Grape", "es": "Uva" },
        "custo_semente": 60, "tempo_crescimento": 11, // Revertido para 11 (valor original do user)
         "tempo_renovacao": 3, "preco_base": 80, "frutos_por_colheita": 1.0, "estacoes": ["outono"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/c/c2/Grape.png",
        "produtos_artesanais": { "vinho": {"base": 240, "artesao": 336}, "geleia_picles": {"base": 210, "artesao": 294}, "passas": {"base": 600, "artesao": 840} }
    },
    // Coleta (Outono)
    "cantarelo": {
        "nomes": { "pt": "Cantarelo", "en": "Chanterelle", "es": "Rebozuelo" },
        "custo_semente": 0, "tempo_crescimento": 0, "tempo_renovacao": 0, "preco_base": 160, "frutos_por_colheita": 1.0, "estacoes": ["outono"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/1/1d/Chanterelle.png",
        "produtos_artesanais": { "geleia_picles": {"base": 370, "artesao": 518}, "oleo": {"base": 1225, "artesao": 1715} }
    },
    "ameixa_selvagem": {
        "nomes": { "pt": "Ameixa selvagem", "en": "Wild Plum", "es": "Ciruela silvestre" },
        "custo_semente": 0, "tempo_crescimento": 0, "tempo_renovacao": 0, "preco_base": 80, "frutos_por_colheita": 1.0, "estacoes": ["outono"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/3/3b/Wild_Plum.png",
        "produtos_artesanais": { "vinho": {"base": 240, "artesao": 336}, "geleia_picles": {"base": 210, "artesao": 294}, "fruta_ressecada": {"base": 625, "artesao": 875} }
    },
    "avela": {
        "nomes": { "pt": "Avelã", "en": "Hazelnut", "es": "Avellana" },
        "custo_semente": 0, "tempo_crescimento": 0, "tempo_renovacao": 0, "preco_base": 90, "frutos_por_colheita": 1.0, "estacoes": ["outono"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/3/31/Hazelnut.png",
        "produtos_artesanais": { "geleia_picles": {"base": 202, "artesao": 282}, "suco": {"base": 230, "artesao": 322} }
    },
    "amora": {
        "nomes": { "pt": "Amora", "en": "Blackberry", "es": "Mora" },
        "custo_semente": 0, "tempo_crescimento": 0, "tempo_renovacao": 0, "preco_base": 20, "frutos_por_colheita": 1.0, "estacoes": ["outono"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/2/25/Blackberry.png",
        "produtos_artesanais": { "vinho": {"base": 60, "artesao": 84}, "geleia_picles": {"base": 90, "artesao": 126}, "fruta_ressecada": {"base": 175, "artesao": 245} }
    },

    // ===========================
    // --- CULTIVOS DE INVERNO ---
    // ===========================

    // Colheita Única
    "melao_poeiro": {
        "nomes": { "pt": "Melão-Poeiro", "en": "Powdermelon", "es": "Melón de nieve" },
        "custo_semente": 0, "tempo_crescimento": 7, "tempo_renovacao": 0, "preco_base": 60, "frutos_por_colheita": 1.0, "estacoes": ["inverno"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/a/aa/Powdermelon.png",
        "produtos_artesanais": { "vinho": {"base": 180, "artesao": 252}, "geleia_picles": {"base": 170, "artesao": 238}, "fruta_ressecada": {"base": 475, "artesao": 665} }
    },
    // Coleta (Inverno)
    "inhame_de_neve": {
        "nomes": { "pt": "Inhame de neve", "en": "Snow Yam", "es": "Boniato de nieve" },
        "custo_semente": 0, "tempo_crescimento": 0, "tempo_renovacao": 0, "preco_base": 100, "frutos_por_colheita": 1.0, "estacoes": ["inverno"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/3/3f/Snow_Yam.png",
        "produtos_artesanais": { "geleia_picles": {"base": 225, "artesao": 315}, "suco": {"base": 250, "artesao": 350} }
    },
    "fruta_de_cristal": {
        "nomes": { "pt": "Fruta de cristal", "en": "Crystal Fruit", "es": "Fruta de cristal" },
        "custo_semente": 0, "tempo_crescimento": 0, "tempo_renovacao": 0, "preco_base": 150, "frutos_por_colheita": 1.0, "estacoes": ["inverno"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/1/16/Crystal_Fruit.png",
        "produtos_artesanais": { "vinho": {"base": 450, "artesao": 630}, "geleia_picles": {"base": 350, "artesao": 490}, "fruta_ressecada": {"base": 1150, "artesao": 1610} }
    },

    // ===========================================
    // --- CULTIVOS MULTI-ESTAÇÃO E ESPECIAIS ---
    // ===========================================

    "grao_de_cafe": {
        "nomes": { "pt": "Grão de café", "en": "Coffee Bean", "es": "Grano de café" },
        "custo_semente": 2500, "tempo_crescimento": 11, // Revertido para 11 (valor original do user)
         "tempo_renovacao": 2, "preco_base": 15, "frutos_por_colheita": 4.0, "estacoes": ["primavera", "verao"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/3/33/Coffee_Bean.png",
        "produtos_artesanais": { "cafe": {"base": 150, "artesao": 150} }
    },
    "milho": {
        "nomes": { "pt": "Milho", "en": "Corn", "es": "Maíz" },
        "custo_semente": 150, "tempo_crescimento": 14, "tempo_renovacao": 4, "preco_base": 50, "frutos_por_colheita": 1.0, "estacoes": ["verao", "outono"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/f/f8/Corn.png",
        "produtos_artesanais": { "geleia_picles": {"base": 112, "artesao": 156}, "suco": {"base": 150, "artesao": 210}, "oleo": {"base": 100, "artesao": 100} }
    },
    "trigo": {
        "nomes": { "pt": "Trigo", "en": "Wheat", "es": "Trigo" },
        "custo_semente": 10, "tempo_crescimento": 4, "tempo_renovacao": 0, "preco_base": 25, "frutos_por_colheita": 1.0, "estacoes": ["verao", "outono"],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/e/e2/Wheat.png",
        "produtos_artesanais": { "cerveja": {"base": 200, "artesao": 280}, "geleia_picles": {"base": 100, "artesao": 140} }
    },
    "cogumelo_comum": {
        "nomes": { "pt": "Cogumelo comum", "en": "Common Mushroom", "es": "Champiñón común" },
        "custo_semente": 0, "tempo_crescimento": 0, "tempo_renovacao": 0, "preco_base": 40, "frutos_por_colheita": 1.0, "estacoes": ["primavera", "outono"], // Verão na Fazenda da Floresta
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/2/2e/Common_Mushroom.png",
        "produtos_artesanais": { "geleia_picles": {"base": 130, "artesao": 182}, "oleo": {"base": 325, "artesao": 455} }
    }

}; // Fim do objeto DADOS_CULTURAS
