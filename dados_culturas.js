// ARQUIVO DE DADOS MANUAL
// Versão Organizada por Estação e Tipo

const DADOS_CULTURAS = {

    // --- CULTIVOS DE PRIMAVERA ---

    // Colheita Única
    "couve_flor": {
        "nome": "Couve-flor",
        "custo_semente": 80,
        "tempo_crescimento": 12,
        "tempo_renovacao": 0,
        "preco_base": 175,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "primavera"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/a/aa/Cauliflower.png",
        "produtos_artesanais": {
            "geleia_picles": {
                "base": 393,
                "artesao": 550
            },
            "suco": {
                "base": 400,
                "artesao": 560
            }
        }
    },
    "alho": {
        "nome": "Alho",
        "custo_semente": 40,
        "tempo_crescimento": 4,
        "tempo_renovacao": 0,
        "preco_base": 60,
        "frutos_por_colheita": 1.0,
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/c/cc/Garlic.png",
        "estacoes": [
            "primavera"
        ],
        "produtos_artesanais": {
            "geleia_picles": {
                "base": 135,
                "artesao": 189
            },
            "suco": {
                "base": 170,
                "artesao": 238
            }
        }
    },
    "couve": {
        "nome": "Couve",
        "custo_semente": 70,
        "tempo_crescimento": 6,
        "tempo_renovacao": 0,
        "preco_base": 110,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "primavera"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/d/d1/Kale.png",
        "produtos_artesanais": {
            "geleia_picles": {
                "base": 247,
                "artesao": 345
            },
            "suco": {
                "base": 270,
                "artesao": 378
            }
        }
    },
    "batata": {
        "nome": "Batata",
        "custo_semente": 50,
        "tempo_crescimento": 6,
        "tempo_renovacao": 0,
        "preco_base": 80,
        "frutos_por_colheita": 1.0, // Wiki diz 1.25, mas mantendo seus dados
        "estacoes": [
            "primavera"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/c/c2/Potato.png",
        "produtos_artesanais": {
            "geleia_picles": {
                "base": 180,
                "artesao": 252
            },
            "suco": {
                "base": 210,
                "artesao": 294
            }
        }
    },
    "ruibarbo": {
        "nome": "Ruibarbo",
        "custo_semente": 100,
        "tempo_crescimento": 13,
        "tempo_renovacao": 0,
        "preco_base": 220,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "primavera"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/6/6e/Rhubarb.png",
        "produtos_artesanais": {
            "vinho": {
                "base": 660,
                "artesao": 924
            },
            "geleia_picles": {
                "base": 490,
                "artesao": 686
            },
            "fruta_ressecada": {
                "base": 1675,
                "artesao": 2345
            }
        }
    },
    "arroz_nao_moido": {
        "nome": "Arroz não moído",
        "custo_semente": 40,
        "tempo_crescimento": 6,
        "tempo_renovacao": 0,
        "preco_base": 30,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "primavera"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/f/fe/Unmilled_Rice.png",
        "produtos_artesanais": {
            "geleia_picles": {
                "base": 67,
                "artesao": 93
            },
            "suco": {
                "base": 110,
                "artesao": 154
            },
            "vinagre": {
                "base": 100,
                "artesao": 100
            }
        }
    },
    "cenoura": {
        "nome": "Cenoura",
        "custo_semente": 0,
        "tempo_crescimento": 3,
        "tempo_renovacao": 0,
        "preco_base": 35,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "primavera"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/c/c3/Carrot.png",
        "produtos_artesanais": {
            "geleia_picles": {
                "base": 78,
                "artesao": 109
            },
            "suco": {
                "base": 120,
                "artesao": 168
            }
        }
    },
    "tulipa": {
        "nome": "Tulipa",
        "custo_semente": 20,
        "tempo_crescimento": 6,
        "tempo_renovacao": 0,
        "preco_base": 30,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "primavera"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/c/cf/Tulip.png",
        "produtos_artesanais": {
            "mel_de_flor": {
                "base": 160,
                "artesao": 224
            }
        }
    },
    "jasmim_azul": {
        "nome": "Jasmim-azul",
        "custo_semente": 30,
        "tempo_crescimento": 7,
        "tempo_renovacao": 0,
        "preco_base": 50,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "primavera"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/2/2f/Blue_Jazz.png",
        "produtos_artesanais": {
            "mel_de_flor": {
                "base": 200,
                "artesao": 280
            }
        }
    },

    // Colheita Múltipla
    "morango": {
        "nome": "Morango",
        "custo_semente": 100,
        "tempo_crescimento": 8,
        "tempo_renovacao": 4,
        "preco_base": 120,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "primavera"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/6/6d/Strawberry.png",
        "produtos_artesanais": {
            "vinho": {
                "base": 360,
                "artesao": 504
            },
            "geleia_picles": {
                "base": 290,
                "artesao": 406
            },
            "fruta_ressecada": {
                "base": 925,
                "artesao": 1295
            }
        }
    },
    "vagem": {
        "nome": "Vagem",
        "custo_semente": 60,
        "tempo_crescimento": 10,
        "tempo_renovacao": 3,
        "preco_base": 40,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "primavera"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/5/5c/Green_Bean.png",
        "produtos_artesanais": {
            "geleia_picles": {
                "base": 90,
                "artesao": 126
            },
            "suco": {
                "base": 130,
                "artesao": 182
            }
        }
    },

    // Coleta (Primavera)
    "cebolinha": {
        "nome": "Cebolinha",
        "custo_semente": 0,
        "tempo_crescimento": 0,
        "tempo_renovacao": 0,
        "preco_base": 8,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "primavera"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/0/0c/Spring_Onion.png",
        "produtos_artesanais": {
            "geleia_picles": {
                "base": 18,
                "artesao": 25
            },
            "suco": {
                "base": 66,
                "artesao": 92
            }
        }
    },
    "amora_silvestre": {
        "nome": "Amora-silvestre",
        "custo_semente": 0,
        "tempo_crescimento": 0,
        "tempo_renovacao": 0,
        "preco_base": 5,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "primavera"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/5/59/Salmonberry.png",
        "produtos_artesanais": {
            "vinho": {
                "base": 15,
                "artesao": 21
            },
            "geleia_picles": {
                "base": 60,
                "artesao": 84
            },
            "fruta_ressecada": {
                "base": 62,
                "artesao": 86
            }
        }
    },
    "morel": {
        "nome": "Morel",
        "custo_semente": 0,
        "tempo_crescimento": 0,
        "tempo_renovacao": 0,
        "preco_base": 150,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "primavera"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/b/b1/Morel.png",
        "produtos_artesanais": {
            "geleia_picles": {
                "base": 350,
                "artesao": 490
            },
            "oleo": {
                "base": 1150,
                "artesao": 1610
            }
        }
    },

    // --- CULTIVOS DE VERÃO ---

    // Colheita Única
    "repolho_roxo": {
        "nome": "Repolho roxo",
        "custo_semente": 100,
        "tempo_crescimento": 9,
        "tempo_renovacao": 0,
        "preco_base": 260,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "verao"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/2/2d/Red_Cabbage.png",
        "produtos_artesanais": {
            "geleia_picles": {
                "base": 585,
                "artesao": 819
            },
            "suco": {
                "base": 570,
                "artesao": 798
            }
        }
    },
    "carambola": {
        "nome": "Carambola",
        "custo_semente": 400,
        "tempo_crescimento": 13,
        "tempo_renovacao": 0,
        "preco_base": 750,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "verao"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/d/db/Starfruit.png",
        "produtos_artesanais": {
            "vinho": {
                "base": 2250,
                "artesao": 3150
            },
            "geleia_picles": {
                "base": 1550,
                "artesao": 2170
            },
            "fruta_ressecada": {
                "base": 5650,
                "artesao": 7910
            }
        }
    },
    "rabanete": {
        "nome": "Rabanete",
        "custo_semente": 40,
        "tempo_crescimento": 6,
        "tempo_renovacao": 0,
        "preco_base": 90,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "verao"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/d/d5/Radish.png",
        "produtos_artesanais": {
            "geleia_picles": {
                "base": 202,
                "artesao": 282
            },
            "suco": {
                "base": 230,
                "artesao": 322
            }
        }
    },
    "papoula": {
        "nome": "Papoula",
        "custo_semente": 100,
        "tempo_crescimento": 7,
        "tempo_renovacao": 0,
        "preco_base": 140,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "verao"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/3/37/Poppy.png",
        "produtos_artesanais": {
            "mel_de_flor": {
                "base": 380,
                "artesao": 532
            }
        }
    },
    "flor_micanga": {
        "nome": "Flor-Miçanga",
        "custo_semente": 50,
        "tempo_crescimento": 8,
        "tempo_renovacao": 0,
        "preco_base": 90,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "verao"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/9/9f/Summer_Spangle.png",
        "produtos_artesanais": {
            "mel_de_flor": {
                "base": 280,
                "artesao": 392
            }
        }
    },

    // Colheita Múltipla
    "mirtilo": {
        "nome": "Mirtilo",
        "custo_semente": 80,
        "tempo_crescimento": 13,
        "tempo_renovacao": 4,
        "preco_base": 50,
        "frutos_por_colheita": 3.0,
        "estacoes": [
            "verao"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/9/9e/Blueberry.png",
        "produtos_artesanais": {
            "vinho": {
                "base": 150,
                "artesao": 210
            },
            "geleia_picles": {
                "base": 150,
                "artesao": 210
            },
            "fruta_ressecada": {
                "base": 400,
                "artesao": 560
            }
        }
    },
    "lupulo": {
        "nome": "Lúpulo",
        "custo_semente": 60,
        "tempo_crescimento": 11,
        "tempo_renovacao": 1,
        "preco_base": 25,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "verao"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/5/59/Hops.png",
        "produtos_artesanais": {
            "pale_ale": {
                "base": 300,
                "artesao": 420
            },
            "geleia_picles": {
                "base": 100,
                "artesao": 140
            }
        }
    },
    "abobrinha_de_verao": {
        "nome": "Abobrinha de Verão",
        "custo_semente": 0,
        "tempo_crescimento": 6,
        "tempo_renovacao": 3,
        "preco_base": 45,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "verao"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/4/43/Summer_Squash.png",
        "produtos_artesanais": {
            "geleia_picles": {
                "base": 101,
                "artesao": 141
            },
            "suco": {
                "base": 140,
                "artesao": 196
            }
        }
    },
    "tomate": {
        "nome": "Tomate",
        "custo_semente": 50,
        "tempo_crescimento": 11,
        "tempo_renovacao": 4,
        "preco_base": 60,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "verao"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/9/9d/Tomato.png",
        "produtos_artesanais": {
            "geleia_picles": {
                "base": 135,
                "artesao": 189
            },
            "suco": {
                "base": 170,
                "artesao": 238
            }
        }
    },
    "pimenta_quente": {
        "nome": "Pimenta quente",
        "custo_semente": 40,
        "tempo_crescimento": 5,
        "tempo_renovacao": 3,
        "preco_base": 40,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "verao"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/f/f1/Hot_Pepper.png",
        "produtos_artesanais": {
            "vinho": {
                "base": 120,
                "artesao": 168
            },
            "geleia_picles": {
                "base": 130,
                "artesao": 182
            },
            "fruta_ressecada": {
                "base": 325,
                "artesao": 455
            }
        }
    },

    // Coleta (Verão)
    "cafe_de_jardim": {
        "nome": "Café de jardim",
        "custo_semente": 0,
        "tempo_crescimento": 0,
        "tempo_renovacao": 0,
        "preco_base": 80,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "verao"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/c/c6/Spice_Berry.png",
        "produtos_artesanais": {
            "vinho": {
                "base": 240,
                "artesao": 336
            },
            "geleia_picles": {
                "base": 210,
                "artesao": 294
            },
            "fruta_ressecada": {
                "base": 625,
                "artesao": 875
            }
        }
    },
    "broto_de_samambaia": {
        "nome": "Broto de samambaia",
        "custo_semente": 0,
        "tempo_crescimento": 0,
        "tempo_renovacao": 0,
        "preco_base": 90,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "verao"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/4/48/Fiddlehead_Fern.png",
        "produtos_artesanais": {
            "geleia_picles": {
                "base": 202,
                "artesao": 282
            },
            "suco": {
                "base": 230,
                "artesao": 322
            }
        }
    },

    // --- CULTIVOS DE OUTONO ---

    // Colheita Única
    "abobora": {
        "nome": "Abóbora",
        "custo_semente": 100,
        "tempo_crescimento": 13,
        "tempo_renovacao": 0,
        "preco_base": 320,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "outono"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/6/64/Pumpkin.png",
        "produtos_artesanais": {
            "geleia_picles": {
                "base": 720,
                "artesao": 1008
            },
            "suco": {
                "base": 690,
                "artesao": 966
            }
        }
    },
    "inhame": {
        "nome": "Inhame",
        "custo_semente": 60,
        "tempo_crescimento": 10,
        "tempo_renovacao": 0,
        "preco_base": 160,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "outono"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/5/52/Yam.png",
        "produtos_artesanais": {
            "geleia_picles": {
                "base": 360,
                "artesao": 504
            },
            "suco": {
                "base": 370,
                "artesao": 518
            }
        }
    },
    "cereja_de_joia_doce": {
        "nome": "Cereja de Joia Doce",
        "custo_semente": 1000,
        "tempo_crescimento": 24,
        "tempo_renovacao": 0,
        "preco_base": 3000,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "outono"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/8/88/Sweet_Gem_Berry.png",
        "produtos_artesanais": {}
    },
    "amaranto": {
        "nome": "Amaranto",
        "custo_semente": 70,
        "tempo_crescimento": 7,
        "tempo_renovacao": 0,
        "preco_base": 150,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "outono"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/f/f6/Amaranth.png",
        "produtos_artesanais": {
            "geleia_picles": {
                "base": 337,
                "artesao": 471
            },
            "suco": {
                "base": 350,
                "artesao": 490
            }
        }
    },
    "alcachofra": {
        "nome": "Alcachofra",
        "custo_semente": 30,
        "tempo_crescimento": 8,
        "tempo_renovacao": 0,
        "preco_base": 160,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "outono"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/d/dd/Artichoke.png",
        "produtos_artesanais": {
            "geleia_picles": {
                "base": 360,
                "artesao": 504
            },
            "suco": {
                "base": 370,
                "artesao": 518
            }
        }
    },
    "beterraba": {
        "nome": "Beterraba",
        "custo_semente": 20,
        "tempo_crescimento": 6,
        "tempo_renovacao": 0,
        "preco_base": 100,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "outono"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/a/a4/Beet.png",
        "produtos_artesanais": {
            "geleia_picles": {
                "base": 225,
                "artesao": 315
            },
            "suco": {
                "base": 250,
                "artesao": 350
            }
        }
    },
    "rosa_de_fada": {
        "nome": "Rosa-de-fada",
        "custo_semente": 200,
        "tempo_crescimento": 12,
        "tempo_renovacao": 0,
        "preco_base": 290,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "outono"
        ],
        "imagem_url": "https://pt.stardewvalleywiki.com/Ficheiro:Fairy_Rose.png",
        "produtos_artesanais": {
            "mel_de_flor": {
                "base": 680,
                "artesao": 952
            }
        }
    },
    "couve_chinesa": {
        "nome": "Couve chinesa",
        "custo_semente": 50,
        "tempo_crescimento": 4,
        "tempo_renovacao": 0,
        "preco_base": 80,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "outono"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/4/40/Bok_Choy.png",
        "produtos_artesanais": {
            "geleia_picles": {
                "base": 180,
                "artesao": 252
            },
            "suco": {
                "base": 210,
                "artesao": 294
            }
        }
    },

    // Colheita Múltipla
    "oxicoco": {
        "nome": "Oxicoco",
        "custo_semente": 240,
        "tempo_crescimento": 7,
        "tempo_renovacao": 5,
        "preco_base": 75,
        "frutos_por_colheita": 2.0,
        "estacoes": [
            "outono"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/6/6e/Cranberries.png",
        "produtos_artesanais": {
            "vinho": {
                "base": 225,
                "artesao": 315
            },
            "geleia_picles": {
                "base": 200,
                "artesao": 280
            },
            "fruta_ressecada": {
                "base": 587,
                "artesao": 821
            }
        }
    },
    "berinjela": {
        "nome": "Berinjela",
        "custo_semente": 20,
        "tempo_crescimento": 5,
        "tempo_renovacao": 5,
        "preco_base": 60,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "outono"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/8/8f/Eggplant.png",
        "produtos_artesanais": {
            "geleia_picles": {
                "base": 135,
                "artesao": 189
            },
            "suco": {
                "base": 170,
                "artesao": 238
            }
        }
    },
    "brocolis": {
        "nome": "Brócolis",
        "custo_semente": 0,
        "tempo_crescimento": 8,
        "tempo_renovacao": 4,
        "preco_base": 70,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "outono"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/f/f1/Broccoli.png",
        "produtos_artesanais": {
            "geleia_picles": {
                "base": 157,
                "artesao": 219
            },
            "suco": {
                "base": 190,
                "artesao": 266
            }
        }
    },
    "uva": {
        "nome": "Uva",
        "custo_semente": 60,
        "tempo_crescimento": 10,
        "tempo_renovacao": 3,
        "preco_base": 80,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "outono"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/c/c2/Grape.png",
        "produtos_artesanais": {
            "vinho": {
                "base": 240,
                "artesao": 336
            },
            "geleia_picles": {
                "base": 210,
                "artesao": 294
            },
            "passas": {
                "base": 600,
                "artesao": 840
            }
        }
    },

    // Coleta (Outono)
    "cantarelo": {
        "nome": "Cantarelo",
        "custo_semente": 0,
        "tempo_crescimento": 0,
        "tempo_renovacao": 0,
        "preco_base": 160,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "outono"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/1/1d/Chanterelle.png",
        "produtos_artesanais": {
            "geleia_picles": {
                "base": 370,
                "artesao": 518
            },
            "oleo": {
                "base": 1225,
                "artesao": 1715
            }
        }
    },
    "ameixa_selvagem": {
        "nome": "Ameixa selvagem",
        "custo_semente": 0,
        "tempo_crescimento": 0,
        "tempo_renovacao": 0,
        "preco_base": 80,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "outono"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/3/3b/Wild_Plum.png",
        "produtos_artesanais": {
            "vinho": {
                "base": 240,
                "artesao": 336
            },
            "geleia_picles": {
                "base": 210,
                "artesao": 294
            },
            "fruta_ressecada": {
                "base": 625,
                "artesao": 875
            }
        }
    },
    "avela": {
        "nome": "Avelã",
        "custo_semente": 0,
        "tempo_crescimento": 0,
        "tempo_renovacao": 0,
        "preco_base": 90,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "outono"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/3/31/Hazelnut.png",
        "produtos_artesanais": {
            "geleia_picles": {
                "base": 202,
                "artesao": 282
            },
            "suco": {
                "base": 230,
                "artesao": 322
            }
        }
    },
    "amora": {
        "nome": "Amora",
        "custo_semente": 0,
        "tempo_crescimento": 0,
        "tempo_renovacao": 0,
        "preco_base": 20,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "outono"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/2/25/Blackberry.png",
        "produtos_artesanais": {
            "vinho": {
                "base": 60,
                "artesao": 84
            },
            "geleia_picles": {
                "base": 90,
                "artesao": 126
            },
            "fruta_ressecada": {
                "base": 175,
                "artesao": 245
            }
        }
    },

    // --- CULTIVOS DE INVERNO ---

    // Colheita Única
    "melao_poeiro": {
        "nome": "Melão-Poeiro",
        "custo_semente": 0,
        "tempo_crescimento": 7,
        "tempo_renovacao": 0,
        "preco_base": 60,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "inverno"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/a/aa/Powdermelon.png",
        "produtos_artesanais": {
            "vinho": {
                "base": 180,
                "artesao": 252
            },
            "geleia_picles": {
                "base": 170,
                "artesao": 238
            },
            "fruta_ressecada": {
                "base": 475,
                "artesao": 665
            }
        }
    },

    // Coleta (Inverno)
    "inhame_de_neve": {
        "nome": "Inhame de neve",
        "custo_semente": 0,
        "tempo_crescimento": 0,
        "tempo_renovacao": 0,
        "preco_base": 100,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "inverno"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/3/3f/Snow_Yam.png",
        "produtos_artesanais": {
            "geleia_picles": {
                "base": 225,
                "artesao": 315
            },
            "suco": {
                "base": 250,
                "artesao": 350
            }
        }
    },
    "fruta_de_cristal": {
        "nome": "Fruta de cristal",
        "custo_semente": 0,
        "tempo_crescimento": 0,
        "tempo_renovacao": 0,
        "preco_base": 150,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "inverno"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/1/16/Crystal_Fruit.png",
        "produtos_artesanais": {
            "vinho": {
                "base": 450,
                "artesao": 630
            },
            "geleia_picles": {
                "base": 350,
                "artesao": 490
            },
            "fruta_ressecada": {
                "base": 1150,
                "artesao": 1610
            }
        }
    },

    // --- CULTIVOS MULTI-ESTAÇÃO E ESPECIAIS ---
    
    "grao_de_cafe": {
        "nome": "Grão de café",
        "custo_semente": 2500,
        "tempo_crescimento": 10,
        "tempo_renovacao": 2,
        "preco_base": 15,
        "frutos_por_colheita": 4.0,
        "estacoes": [
            "primavera",
            "verao"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/3/33/Coffee_Bean.png",
        "produtos_artesanais": {
            "cafe": {
                "base": 150,
                "artesao": 150
            }
        }
    },
    "milho": {
        "nome": "Milho",
        "custo_semente": 150,
        "tempo_crescimento": 14,
        "tempo_renovacao": 4,
        "preco_base": 50,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "verao",
            "outono"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/f/f8/Corn.png",
        "produtos_artesanais": {
            "geleia_picles": {
                "base": 112,
                "artesao": 156
            },
            "suco": {
                "base": 150,
                "artesao": 210
            },
            "oleo": {
                "base": 100,
                "artesao": 100
            }
        }
    },
    "trigo": {
        "nome": "Trigo",
        "custo_semente": 10,
        "tempo_crescimento": 4,
        "tempo_renovacao": 0,
        "preco_base": 25,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "verao",
            "outono"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/e/e2/Wheat.png",
        "produtos_artesanais": {
            "cerveja": {
                "base": 200,
                "artesao": 280
            },
            "geleia_picles": {
                "base": 100,
                "artesao": 140
            }
        }
    },
    "cogumelo_comum": {
        "nome": "Cogumelo comum",
        "custo_semente": 0,
        "tempo_crescimento": 0,
        "tempo_renovacao": 0,
        "preco_base": 40,
        "frutos_por_colheita": 1.0,
        "estacoes": [
            "primavera",
            "outono"
        ],
        "imagem_url": "https://stardewvalleywiki.com/mediawiki/images/2/2e/Common_Mushroom.png",
        "produtos_artesanais": {
            "geleia_picles": {
                "base": 130,
                "artesao": 182
            },
            "oleo": {
                "base": 325,
                "artesao": 455
            }
        }
    }

}; // Fim do objeto DADOS_CULTURAS