export function mockRecognize() {
    return Promise.resolve({
        code: 200,
        data: {
            "id": "93c1c551-7a48-495f-9338-a5efa020421d",
            "count_status": 1,
            "ocr_status": 1,
            "cloud_ocr": 0,
            "ctime": "1729437205",
            "utime": "1729437205",
            "status": null,
            "img_name": "测试 两页pdf.pdf",
            "img_uri": "blob:http://localhost:8000/f2c3d557-7903-400c-887e-02e6b8fbf463",
            "thumbnail": "blob:http://localhost:8000/f2c3d557-7903-400c-887e-02e6b8fbf463",
            "pdf_url": "http://139.198.14.73:8080/static/papers/d1980ada1f9642d2b924e8f033d0a738.pdf",
            "result": {
                "markdown": "This article has been accepted for publication in a future issue of this journal, but has not been fully edited. Content may chane prior to final publication. Citation information: DOI 10.1109/TVCG.2020.3030440,IEEE\n\nTransactions on Visualization and Computer Graphics\n\n# Context-aware Sampling of Large Networks via Graph\n\nRepresentation Learning\n\nZhiguang Zhou, Chen Shi, Xilong Shen, Lihong Cai, Haoxuan Wang,\n\nYuhua Liu,Ying Zhao and Wei Chen\n\n<!-- a. C. b. d. e. g. f. h.  -->\n![](https://textin-image-store-1303028177.cos.ap-shanghai.myqcloud.com/external/e616a02f49d8d2cb)\n\nFig. 1. A case for a Webbase data (16k nodes, 26k edges) based on our context-aware sampling method. (a) presents the original graph with a node-link diagram. (c) presents scatterplots obtained through GRL (node2vec) and dimensionality reduction (t-SNE). (e)highlights a local structure of interest in (a), and the circled nodes are of significance. (g) presents an aggregated layout of (a), in which each supernode represents a community feature. Our sampling method is conducted on (c), and the sampled scatterplots are presented in (d) with a contextual structure of interest highlighted by a red circle. (b) presents the corresponding sampled graph, with the significant features retained such as bridging nodes highlighted in (f) and graph connections presented in (h).\n\nAbstract-Numerous sampling strategies have been proposed to simplify large-scale networks for highly readable visualizations. It is of great challenge to preserve contextual structures formed by nodes and edges with tight relationships in a sampled graph, because they are easily overlooked during the process of sampling due to their irregular distribution and immunity to scale. In this paper,a new graph sampling method is proposed oriented to the preservation of contextual structures. We first utilize a graph representation learning (GRL) model to transform nodes into vectors so that the contextual structures in a network can be effectively extracted and organized. Then, we propose a multi-objective blue noise sampling model to select a subset of nodes in the vectorized space to preserve contextual structures with the retention of relative data and cluster densities in addition to those features of significance,such as bridging nodes and graph connections. We also design a set of visual interfaces enabling users to interactively conduct context-aware sampling, visually compare results with various sampling strategies, and deeply explore large networks. Case studies and quantitative comparisons based on real-world datasets have demonstrated the effectiveness of our method in the abstraction and exploration of large networks.\n\nIndex Terms-Graph sampling, Graph representation learning, Blue noise sampling, Graph evaluation\n\n\n![](https://textin-image-store-1303028177.cos.ap-shanghai.myqcloud.com/external/84c42c140c4b3212)\n\n## 1 INTRODUCTION\n\n·Zhiguang Zhou, Chen Shi,Xilong Shen,Lihong Cai,Haoxuan Wang and Yuhua Liu are with School of Information,Zhejiang University of Finance and Economics. E-mail: {zhgzhou1983, shichen, 180110910420,cailihong,wanghaoxuan,liuyuhua}@zufe.edu.cn.\n\n·Ying Zhao is with Central South University. E-mail:zhaoying@csu.edu.cn.\n\n·Wei Chen is with State Key Lab of CAD & CG, Zhejiang University.\n\nE-mail:chenwei@cad.zju.edu.cn.\n\n·Ying Zhao and Wei Chen are corresponding authors.\n\nManuscript received xx xxx. 201x; accepted xx xxx. 201x.Date of Publication xx xxx.201x;date of current version xx xxx. 201x. For information on obtaining reprints ofthis article, please send e-mail to: reprints@ieee.org.Digital Object Identifier: xx.xxxx/TVCG.201x.xxxxxxxx\n\nAs a ubiquitous data structure, network is always employed to encode relationships among entities in a variety of application areas,such as social relationships between people and financial transactions between companies [5,57]. Graph visualization offers an interactive and ex-ploratory means allowing users to gain structural insights [2] and sense implicit contextual features of networks. However, with the increase of data sizes, the visual exploration and analysis of networks are se-riously influenced,because nodes and edges overlap with each other and generate much visual clutter in large graph visualizations, making it a complicated and time-consuming task to visually explore structural features of significance [50].\n\nGraph sampling is commonly used to reduce thevisual clutter and address scalability issues in the visual exploration of large networks,by means of which a subset of nodes and edges are selected on behalf of the original large graph. Over the past few decades, numerous ef-\n\nThis article has been accepted for publication in a future issue of tis journal, but has not been fully edited. Content may change prior to final publication. Citation information: DOI 10.1109/TVCG.2020.3030440, IEEE\n\nTransactions on Visualization and Computer Graphics\n\nforts have been paid on the design of sampling strategies, ranging from node-based and edge-based schemes [4,26] to transversal-based and semantic-based schemes [4,23,56]. However, such strategies largely focus on sampling efficiency and randomness of sampling results, pay-ing little attention to the preservation of significant contextual struc-tures.\n\nContextual structures, formed by nodes and edges with tight rela-tionships, are always of great significance for the exploration and in-terpretation of networks, such as bridging nodes, connected paths and aggregated communities [19,46].For example, it is quite necessary to identify the contextual structures of crowd movement network for the diagnosis and spread prevention of infectious diseases [44]. Howev-er, it is a tough task to preserve contextual structures in the sampled network based on traditional sampling strategies, because contextual structures often have three characteristics: concealment in location, ir-regularity in scale, and complexity in structure. For example, nodes with tight relationships (in a community) may be difficult to find in large networks due to their concealed locations, because they are eas-ily laid out far away from each other. Also, contextual structures are immune to scale, that is few nodes and edges would rather present a tough contextual structure (a small complete graph). Thus,it is re-ally hard to give a comprehensive definition of contextual structures because their formations are too complicated to find a regular pattern.\n\nAs an effective way to represent and identify contextual structures of large networks [5], GRL has been widely applied in a variety of research areas, such as graph classification, graph query, graph min-ing,et al [12,33]. It transforms nodes into vectors to quantitate the structural features of networks. Numerous GRL models have been pro-posed to train and represent nodes according to their local contexts in the network, such as deepwalk [39],node2vec [11],and struc2vec [42].A family of biased random walks are developed in the course of corpus generation allowing an efficient exploration of diverse neighborhoods for given nodes [32]. Thus,network structures are well represented in a vectroized space obtained by GRL (e.g. a contextual structure of interest is highlighted as shown in Figure la and Figure 1c). We be-lieve that it would be a feasible way to conduct graph sampling in the vectorized space, and the contextual structures would be preserved as far as possible (e.g. the contextual structure is well preserved in the sampled graph as shown in Figure 1d and Figure 1b).\n\nHowever,there are still severa problems to overcome for the p-reservation of contextual structures in the vectorized space obtained through GRL.P1: GRL is able to encode the contextual structures with vectorizied representation, but the vectorized space is too compli-cated to gaininsights due to its high dimensions. P2: It is a difficult task to define a graph sampling model to preserve contextual structures captured by GRL,since they are represented with data distributions in the vectorized space rather than topological relationships in the origi-nal network space. P3: It is also difficult to conduct a unified graph sampling scheme to preserve various kinds of contextual structures in the vectorized space due to their respective characteristics. P4: It is another tough task to evaluate the sampled graphs from a variety of perspectives,and further demonstrate that the contextual structures of significance are well retained in the sampled graphs.\n\nIn this paper, we propose a novel graph sampling method to simpli-fy large graphs, especially with the contextual structures identified and preserved in the sampled graphs. Firstly, a GRL model is employed to encode contextual structures and a dimensionality reduction method is applied to transform the contextual structures into a low-dimensional vectorized space,where nodes sharing similar contextual features are visually distributed close to each other (P1). Then, we propose a novel blue noise sampling model to generate a subset of nodes in the vec-torized space, guaranteeing that nodes with tight relationships are re-tained and the contextual features are well preserved in the sampled graph (P2). A set of desired objectives are further integrated into the sampling model to optimize the sampled graphs, in which topological features of significance are enhanced such as bridging nodes and graph connection (P3). Also, we utilize a group of metrics to evaluate the va-lidity of our sampling method in contextual feature preservation from different perspectives, such as node importance, graph connection and\n\ncommunity changes (P4). At last, a graph sampling framework is im-plemented to integrate sampling models, GRL and visual designs of metrics, and a rich set of interactions are also provided allowing users to intuitively evaluate different sampling strategies and easily explore structures of interest in large networks. The effectiveness and use-fulness of our system are further demonstrated with case studies and quantitate comparisons based on real-world datasets. In summary, the main contributions of our work are:\n\n·We utilize a GRL model (node2vec) to quantitate the contextu-al features of networks, offering important clues for graph sam-pling. To the best of our knowledge, it is the first to sample graphs with GRL.\n\n·We design a multi-objective blue noise sampling model to simpli-fy large networks, with the contextual structures and their topo-logical features well retained in the sampled graphs.\n\nWe propose a group of specific metrics enabling users to com-pare sampling strategies from different perspectives, and conduct case studies with real-world datasets to demonstrate the validity of our context-aware graph sampling method.\n\n## 2 RELATED WORK\n\nWe classify existing methods into four categories,including large graph visualization, graph sampling, metrics for graph evaluation and graph representation learning.\n\n### 2.1 Large Graph Visualization\n\nGraph visualization is widely used for network analysis [5].Node-link diagram is a most intuitive layout scheme in which the nodes are rep-resented as points and edges are represented as lines. Force-directed methods are employed to layout the node-link diagrams by optimizing graph drawing aesthetics [10,19,41]. With the increasing size of net-works, the readability of node-link diagrams largely decreases due to visual clutter and scalability issues [9]. Two categories of methods are proposed: (1) Graph clustering methods aggregate groups of nodes and edges with similar properties to reduce the visual complexity of large graphs [7,58]. ASK-GraphView [1] was proposed to organize a large graph into hierarchical structures allowing users to aggregate nodes to reduce visual clutter. To reduce edge crossings and empha-size directional patterns, a set of edge-based clustering methods are proposed in which edges with similar spatial distribution features are bundled together [6,8,15,16]. (2) Graph filtering methods extract subgraphs of interest from original large graphs [20]. Hennessey et al. [14] took a set of graph metrics into account to obtain representa-tive skeletons and simplify the visualization of large graphs, such as shortest path and distance to the central node. Yoghourdjian et al. [51]proposed Graph Thumbnails to enhance the readability of large graph-s with high-level structures described with small icon-like glyphs.It can be seen that the underlying topological structures of networks are changed with clustering methods,which are still not preserved in the simplified graphs with filteringmethods. It might generate a great deal of ambiguity that misleads the exploration of networks [49].\n\n### 2.2 Graph Sampling\n\nGraph sampling is another kind of filtering method, which also gen-erates a subset of nodes or edges to simplify the original networks.Three categories are covered: (1) Node-based Sampling. Random Node Sampling (RNS) [26] is commonly used to randomly generate nodes from the original network. A set of graph properties are con-sidered to improve the results of node-based sampling. For example,Random PageRank Node (RPN) defines the probability of nodes to be sampled as proportional to their PageRank weights [26,36]. Random Degree Node (RDN) increases the probability of nodes with higher de-gree values to be sampled [4]. Hu et al. [18] designed a graph sampling method based on spectral sparsification, to reduce the number of edges and retain structural properties of original graphs. (2) Edge-based Sampling. Random Edge Sampling (RES) extracts a random subset of\n\n",
                "success_count": 2,
                "catalog": {
                    "toc": [
                        {
                            "pos": [
                                203,
                                109,
                                1030,
                                109,
                                1030,
                                195,
                                203,
                                195
                            ],
                            "page_id": 1,
                            "hierarchy": 2,
                            "pos_list": [
                                [
                                    203,
                                    109,
                                    1030,
                                    109,
                                    1030,
                                    151,
                                    203,
                                    151
                                ],
                                [
                                    427,
                                    155,
                                    809,
                                    155,
                                    809,
                                    195,
                                    427,
                                    195
                                ]
                            ],
                            "title": "Context-aware Sampling of Large Networks via GraphRepresentation Learning",
                            "sub_type": "text_title"
                        },
                        {
                            "pos": [
                                151,
                                725,
                                1085,
                                725,
                                1085,
                                837,
                                151,
                                837
                            ],
                            "page_id": 1,
                            "hierarchy": 3,
                            "pos_list": [
                                [
                                    151,
                                    725,
                                    1085,
                                    725,
                                    1085,
                                    837,
                                    151,
                                    837
                                ]
                            ],
                            "title": "Fig. 1. A case for a Webbase data (16k nodes, 26k edges) based on our context-aware sampling method. (a) presents the original graph with a node-link diagram. (c) presents scatterplots obtained through GRL (node2vec) and dimensionality reduction (t-SNE). (e)highlights a local structure of interest in (a), and the circled nodes are of significance. (g) presents an aggregated layout of (a), in which each supernode represents a community feature. Our sampling method is conducted on (c), and the sampled scatterplots are presented in (d) with a contextual structure of interest highlighted by a red circle. (b) presents the corresponding sampled graph, with the significant features retained such as bridging nodes highlighted in (f) and graph connections presented in (h).",
                            "sub_type": "image_title"
                        },
                        {
                            "pos": [
                                103,
                                1157,
                                256,
                                1157,
                                256,
                                1177,
                                103,
                                1177
                            ],
                            "page_id": 1,
                            "hierarchy": 2,
                            "pos_list": [
                                [
                                    103,
                                    1157,
                                    256,
                                    1157,
                                    256,
                                    1177,
                                    103,
                                    1177
                                ]
                            ],
                            "title": "1 INTRODUCTION",
                            "sub_type": "text_title"
                        },
                        {
                            "pos": [
                                609,
                                554,
                                780,
                                554,
                                780,
                                576,
                                609,
                                576
                            ],
                            "page_id": 2,
                            "hierarchy": 2,
                            "pos_list": [
                                [
                                    609,
                                    554,
                                    780,
                                    554,
                                    780,
                                    576,
                                    609,
                                    576
                                ]
                            ],
                            "title": "2 RELATED WORK",
                            "sub_type": "text_title"
                        },
                        {
                            "pos": [
                                609,
                                657,
                                881,
                                657,
                                881,
                                679,
                                609,
                                679
                            ],
                            "page_id": 2,
                            "hierarchy": 3,
                            "pos_list": [
                                [
                                    609,
                                    657,
                                    881,
                                    657,
                                    881,
                                    679,
                                    609,
                                    679
                                ]
                            ],
                            "title": "2.1 Large Graph Visualization",
                            "sub_type": "text_title"
                        },
                        {
                            "pos": [
                                611,
                                1199,
                                800,
                                1199,
                                800,
                                1221,
                                611,
                                1221
                            ],
                            "page_id": 2,
                            "hierarchy": 3,
                            "pos_list": [
                                [
                                    611,
                                    1199,
                                    800,
                                    1199,
                                    800,
                                    1221,
                                    611,
                                    1221
                                ]
                            ],
                            "title": "2.2 Graph Sampling",
                            "sub_type": "text_title"
                        }
                    ]
                },
                "pages": [
                    {
                        "angle": 0,
                        "page_id": 1,
                        "content": [
                            {
                                "pos": [
                                    38,
                                    5,
                                    1184,
                                    5,
                                    1184,
                                    24,
                                    38,
                                    24
                                ],
                                "id": 0,
                                "score": 0.9879999756813,
                                "type": "line",
                                "text": "This article has been accepted for publication in a future issue of this journal, but has not been fully edited. Content may chane prior to final publication. Citation information: DOI 10.1109/TVCG.2020.3030440,IEEE"
                            },
                            {
                                "pos": [
                                    465,
                                    25,
                                    757,
                                    25,
                                    757,
                                    42,
                                    465,
                                    42
                                ],
                                "id": 1,
                                "score": 0.99800002574921,
                                "type": "line",
                                "text": "Transactions on Visualization and Computer Graphics"
                            },
                            {
                                "pos": [
                                    206,
                                    111,
                                    1034,
                                    113,
                                    1034,
                                    155,
                                    206,
                                    153
                                ],
                                "id": 2,
                                "score": 0.99199998378754,
                                "type": "line",
                                "text": "Context-aware Sampling of Large Networks via Graph"
                            },
                            {
                                "pos": [
                                    429,
                                    157,
                                    813,
                                    157,
                                    813,
                                    199,
                                    429,
                                    199
                                ],
                                "id": 3,
                                "score": 0.9990000128746,
                                "type": "line",
                                "text": "Representation Learning"
                            },
                            {
                                "pos": [
                                    313,
                                    220,
                                    926,
                                    220,
                                    926,
                                    248,
                                    313,
                                    248
                                ],
                                "id": 4,
                                "score": 0.96399998664856,
                                "type": "line",
                                "text": "Zhiguang Zhou, Chen Shi, Xilong Shen, Lihong Cai, Haoxuan Wang,"
                            },
                            {
                                "pos": [
                                    457,
                                    246,
                                    785,
                                    246,
                                    785,
                                    273,
                                    457,
                                    273
                                ],
                                "id": 5,
                                "score": 0.99199998378754,
                                "type": "line",
                                "text": "Yuhua Liu,Ying Zhao and Wei Chen"
                            },
                            {
                                "pos": [
                                    185,
                                    298,
                                    205,
                                    298,
                                    205,
                                    316,
                                    185,
                                    316
                                ],
                                "id": 6,
                                "score": 0.99500000476837,
                                "type": "line",
                                "text": "a."
                            },
                            {
                                "pos": [
                                    540,
                                    298,
                                    561,
                                    298,
                                    561,
                                    316,
                                    540,
                                    316
                                ],
                                "id": 7,
                                "score": 0.94099998474121,
                                "type": "line",
                                "text": "C."
                            },
                            {
                                "pos": [
                                    745,
                                    291,
                                    769,
                                    291,
                                    769,
                                    318,
                                    745,
                                    318
                                ],
                                "id": 8,
                                "score": 0.99599999189377,
                                "type": "line",
                                "text": "b."
                            },
                            {
                                "pos": [
                                    540,
                                    449,
                                    559,
                                    449,
                                    559,
                                    471,
                                    540,
                                    471
                                ],
                                "id": 9,
                                "score": 0.91000002622604,
                                "type": "line",
                                "text": "d."
                            },
                            {
                                "pos": [
                                    182,
                                    605,
                                    200,
                                    605,
                                    200,
                                    622,
                                    182,
                                    622
                                ],
                                "id": 10,
                                "score": 0.8289999961853,
                                "type": "line",
                                "text": "e."
                            },
                            {
                                "pos": [
                                    389,
                                    605,
                                    407,
                                    605,
                                    407,
                                    625,
                                    389,
                                    625
                                ],
                                "id": 11,
                                "score": 0.96499997377396,
                                "type": "line",
                                "text": "g."
                            },
                            {
                                "pos": [
                                    684,
                                    601,
                                    701,
                                    601,
                                    701,
                                    622,
                                    684,
                                    622
                                ],
                                "id": 12,
                                "score": 0.98000001907349,
                                "type": "line",
                                "text": "f."
                            },
                            {
                                "pos": [
                                    888,
                                    601,
                                    912,
                                    601,
                                    912,
                                    624,
                                    888,
                                    624
                                ],
                                "id": 13,
                                "score": 0.9879999756813,
                                "type": "line",
                                "text": "h."
                            },
                            {
                                "size": [
                                    411,
                                    196
                                ],
                                "id": 14,
                                "pos": [
                                    173,
                                    284,
                                    1076,
                                    284,
                                    1076,
                                    716,
                                    171,
                                    715
                                ],
                                "data": {
                                    "base64": "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",
                                    "path": "https://textin-image-store-1303028177.cos.ap-shanghai.myqcloud.com/external/e616a02f49d8d2cb",
                                    "region": [
                                        173,
                                        284,
                                        1076,
                                        284,
                                        1076,
                                        716,
                                        171,
                                        715
                                    ]
                                },
                                "type": "image"
                            },
                            {
                                "pos": [
                                    152,
                                    728,
                                    1088,
                                    728,
                                    1088,
                                    751,
                                    152,
                                    751
                                ],
                                "id": 15,
                                "score": 0.98000001907349,
                                "type": "line",
                                "text": "Fig. 1. A case for a Webbase data (16k nodes, 26k edges) based on our context-aware sampling method. (a) presents the original"
                            },
                            {
                                "pos": [
                                    152,
                                    748,
                                    1088,
                                    748,
                                    1088,
                                    766,
                                    152,
                                    766
                                ],
                                "id": 16,
                                "score": 0.98199999332428,
                                "type": "line",
                                "text": "graph with a node-link diagram. (c) presents scatterplots obtained through GRL (node2vec) and dimensionality reduction (t-SNE). (e)"
                            },
                            {
                                "pos": [
                                    152,
                                    768,
                                    1086,
                                    768,
                                    1086,
                                    786,
                                    152,
                                    786
                                ],
                                "id": 17,
                                "score": 0.98500001430511,
                                "type": "line",
                                "text": "highlights a local structure of interest in (a), and the circled nodes are of significance. (g) presents an aggregated layout of (a), in"
                            },
                            {
                                "pos": [
                                    152,
                                    786,
                                    1086,
                                    786,
                                    1086,
                                    805,
                                    152,
                                    805
                                ],
                                "id": 18,
                                "score": 0.9879999756813,
                                "type": "line",
                                "text": "which each supernode represents a community feature. Our sampling method is conducted on (c), and the sampled scatterplots are"
                            },
                            {
                                "pos": [
                                    152,
                                    805,
                                    1086,
                                    805,
                                    1086,
                                    823,
                                    152,
                                    823
                                ],
                                "id": 19,
                                "score": 0.98100000619888,
                                "type": "line",
                                "text": "presented in (d) with a contextual structure of interest highlighted by a red circle. (b) presents the corresponding sampled graph, with"
                            },
                            {
                                "pos": [
                                    152,
                                    825,
                                    949,
                                    825,
                                    949,
                                    842,
                                    152,
                                    842
                                ],
                                "id": 20,
                                "score": 0.99199998378754,
                                "type": "line",
                                "text": "the significant features retained such as bridging nodes highlighted in (f) and graph connections presented in (h)."
                            },
                            {
                                "pos": [
                                    152,
                                    856,
                                    1088,
                                    856,
                                    1088,
                                    873,
                                    152,
                                    873
                                ],
                                "id": 21,
                                "score": 0.99099999666214,
                                "type": "line",
                                "text": "Abstract-Numerous sampling strategies have been proposed to simplify large-scale networks for highly readable visualizations. It is"
                            },
                            {
                                "pos": [
                                    152,
                                    875,
                                    1086,
                                    875,
                                    1086,
                                    893,
                                    152,
                                    893
                                ],
                                "id": 22,
                                "score": 0.99199998378754,
                                "type": "line",
                                "text": "of great challenge to preserve contextual structures formed by nodes and edges with tight relationships in a sampled graph, because"
                            },
                            {
                                "pos": [
                                    152,
                                    893,
                                    1088,
                                    893,
                                    1088,
                                    912,
                                    152,
                                    912
                                ],
                                "id": 23,
                                "score": 0.99099999666214,
                                "type": "line",
                                "text": "they are easily overlooked during the process of sampling due to their irregular distribution and immunity to scale. In this paper,a"
                            },
                            {
                                "pos": [
                                    152,
                                    913,
                                    1086,
                                    913,
                                    1086,
                                    930,
                                    152,
                                    930
                                ],
                                "id": 24,
                                "score": 0.99500000476837,
                                "type": "line",
                                "text": "new graph sampling method is proposed oriented to the preservation of contextual structures. We first utilize a graph representation"
                            },
                            {
                                "pos": [
                                    152,
                                    932,
                                    1086,
                                    932,
                                    1086,
                                    950,
                                    152,
                                    950
                                ],
                                "id": 25,
                                "score": 0.99000000953674,
                                "type": "line",
                                "text": "learning (GRL) model to transform nodes into vectors so that the contextual structures in a network can be effectively extracted and"
                            },
                            {
                                "pos": [
                                    152,
                                    950,
                                    1086,
                                    950,
                                    1086,
                                    969,
                                    152,
                                    969
                                ],
                                "id": 26,
                                "score": 0.98400002717972,
                                "type": "line",
                                "text": "organized. Then, we propose a multi-objective blue noise sampling model to select a subset of nodes in the vectorized space to"
                            },
                            {
                                "pos": [
                                    152,
                                    970,
                                    1088,
                                    970,
                                    1088,
                                    987,
                                    152,
                                    987
                                ],
                                "id": 27,
                                "score": 0.98900002241135,
                                "type": "line",
                                "text": "preserve contextual structures with the retention of relative data and cluster densities in addition to those features of significance,"
                            },
                            {
                                "pos": [
                                    152,
                                    989,
                                    1088,
                                    989,
                                    1088,
                                    1008,
                                    152,
                                    1008
                                ],
                                "id": 28,
                                "score": 0.99099999666214,
                                "type": "line",
                                "text": "such as bridging nodes and graph connections. We also design a set of visual interfaces enabling users to interactively conduct"
                            },
                            {
                                "pos": [
                                    152,
                                    1008,
                                    1088,
                                    1008,
                                    1088,
                                    1026,
                                    152,
                                    1026
                                ],
                                "id": 29,
                                "score": 0.99000000953674,
                                "type": "line",
                                "text": "context-aware sampling, visually compare results with various sampling strategies, and deeply explore large networks. Case studies"
                            },
                            {
                                "pos": [
                                    152,
                                    1026,
                                    1086,
                                    1026,
                                    1086,
                                    1045,
                                    152,
                                    1045
                                ],
                                "id": 30,
                                "score": 0.99199998378754,
                                "type": "line",
                                "text": "and quantitative comparisons based on real-world datasets have demonstrated the effectiveness of our method in the abstraction and"
                            },
                            {
                                "pos": [
                                    152,
                                    1046,
                                    363,
                                    1046,
                                    363,
                                    1065,
                                    152,
                                    1065
                                ],
                                "id": 31,
                                "score": 0.99699997901917,
                                "type": "line",
                                "text": "exploration of large networks."
                            },
                            {
                                "pos": [
                                    151,
                                    1071,
                                    879,
                                    1071,
                                    879,
                                    1094,
                                    151,
                                    1094
                                ],
                                "id": 32,
                                "score": 0.98199999332428,
                                "type": "line",
                                "text": "Index Terms-Graph sampling, Graph representation learning, Blue noise sampling, Graph evaluation"
                            },
                            {
                                "pos": [
                                    383,
                                    1108,
                                    846,
                                    1106,
                                    846,
                                    1139,
                                    382,
                                    1141
                                ],
                                "id": 33,
                                "score": 1,
                                "type": "line",
                                "text": ""
                            },
                            {
                                "size": [
                                    210,
                                    14
                                ],
                                "id": 34,
                                "pos": [
                                    383,
                                    1108,
                                    846,
                                    1106,
                                    846,
                                    1139,
                                    382,
                                    1141
                                ],
                                "data": {
                                    "base64": "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",
                                    "path": "https://textin-image-store-1303028177.cos.ap-shanghai.myqcloud.com/external/84c42c140c4b3212",
                                    "region": [
                                        383,
                                        1108,
                                        846,
                                        1106,
                                        846,
                                        1139,
                                        382,
                                        1141
                                    ]
                                },
                                "type": "image"
                            },
                            {
                                "pos": [
                                    104,
                                    1158,
                                    260,
                                    1158,
                                    260,
                                    1181,
                                    104,
                                    1181
                                ],
                                "id": 35,
                                "score": 0.99599999189377,
                                "type": "line",
                                "text": "1 INTRODUCTION"
                            },
                            {
                                "pos": [
                                    110,
                                    1229,
                                    595,
                                    1229,
                                    595,
                                    1247,
                                    110,
                                    1247
                                ],
                                "id": 36,
                                "score": 0.98600000143051,
                                "type": "line",
                                "text": "·Zhiguang Zhou, Chen Shi,Xilong Shen,Lihong Cai,Haoxuan Wang and"
                            },
                            {
                                "pos": [
                                    129,
                                    1249,
                                    602,
                                    1249,
                                    602,
                                    1266,
                                    129,
                                    1266
                                ],
                                "id": 37,
                                "score": 0.99000000953674,
                                "type": "line",
                                "text": "Yuhua Liu are with School of Information,Zhejiang University of Finance"
                            },
                            {
                                "pos": [
                                    129,
                                    1269,
                                    550,
                                    1267,
                                    550,
                                    1286,
                                    129,
                                    1287
                                ],
                                "id": 38,
                                "score": 0.97699999809265,
                                "type": "line",
                                "text": "and Economics. E-mail: {zhgzhou1983, shichen, 180110910420,"
                            },
                            {
                                "pos": [
                                    129,
                                    1288,
                                    451,
                                    1288,
                                    451,
                                    1305,
                                    129,
                                    1305
                                ],
                                "id": 39,
                                "score": 0.9990000128746,
                                "type": "line",
                                "text": "cailihong,wanghaoxuan,liuyuhua}@zufe.edu.cn."
                            },
                            {
                                "pos": [
                                    110,
                                    1308,
                                    608,
                                    1308,
                                    608,
                                    1326,
                                    110,
                                    1326
                                ],
                                "id": 40,
                                "score": 0.9879999756813,
                                "type": "line",
                                "text": "·Ying Zhao is with Central South University. E-mail:zhaoying@csu.edu.cn."
                            },
                            {
                                "pos": [
                                    110,
                                    1327,
                                    562,
                                    1329,
                                    562,
                                    1348,
                                    110,
                                    1346
                                ],
                                "id": 41,
                                "score": 0.97600001096725,
                                "type": "line",
                                "text": "·Wei Chen is with State Key Lab of CAD & CG, Zhejiang University."
                            },
                            {
                                "pos": [
                                    127,
                                    1348,
                                    347,
                                    1348,
                                    347,
                                    1366,
                                    127,
                                    1366
                                ],
                                "id": 42,
                                "score": 0.9990000128746,
                                "type": "line",
                                "text": "E-mail:chenwei@cad.zju.edu.cn."
                            },
                            {
                                "pos": [
                                    112,
                                    1368,
                                    465,
                                    1368,
                                    465,
                                    1387,
                                    112,
                                    1387
                                ],
                                "id": 43,
                                "score": 0.99500000476837,
                                "type": "line",
                                "text": "·Ying Zhao and Wei Chen are corresponding authors."
                            },
                            {
                                "pos": [
                                    109,
                                    1394,
                                    608,
                                    1394,
                                    608,
                                    1413,
                                    109,
                                    1413
                                ],
                                "id": 44,
                                "score": 0.97399997711182,
                                "type": "line",
                                "text": "Manuscript received xx xxx. 201x; accepted xx xxx. 201x.Date of Publication"
                            },
                            {
                                "pos": [
                                    104,
                                    1414,
                                    556,
                                    1414,
                                    556,
                                    1431,
                                    104,
                                    1431
                                ],
                                "id": 45,
                                "score": 0.96299999952316,
                                "type": "line",
                                "text": "xx xxx.201x;date of current version xx xxx. 201x. For information on"
                            },
                            {
                                "pos": [
                                    104,
                                    1433,
                                    584,
                                    1433,
                                    584,
                                    1452,
                                    104,
                                    1452
                                ],
                                "id": 46,
                                "score": 0.98400002717972,
                                "type": "line",
                                "text": "obtaining reprints ofthis article, please send e-mail to: reprints@ieee.org."
                            },
                            {
                                "pos": [
                                    104,
                                    1452,
                                    454,
                                    1452,
                                    454,
                                    1470,
                                    104,
                                    1470
                                ],
                                "id": 47,
                                "score": 0.9539999961853,
                                "type": "line",
                                "text": "Digital Object Identifier: xx.xxxx/TVCG.201x.xxxxxxxx"
                            },
                            {
                                "pos": [
                                    630,
                                    1190,
                                    1134,
                                    1190,
                                    1134,
                                    1209,
                                    630,
                                    1209
                                ],
                                "id": 48,
                                "score": 0.99000000953674,
                                "type": "line",
                                "text": "As a ubiquitous data structure, network is always employed to encode"
                            },
                            {
                                "pos": [
                                    630,
                                    1210,
                                    1134,
                                    1210,
                                    1134,
                                    1229,
                                    630,
                                    1229
                                ],
                                "id": 49,
                                "score": 0.99400001764297,
                                "type": "line",
                                "text": "relationships among entities in a variety of application areas,such as"
                            },
                            {
                                "pos": [
                                    630,
                                    1230,
                                    1134,
                                    1230,
                                    1134,
                                    1249,
                                    630,
                                    1249
                                ],
                                "id": 50,
                                "score": 0.99500000476837,
                                "type": "line",
                                "text": "social relationships between people and financial transactions between"
                            },
                            {
                                "pos": [
                                    630,
                                    1250,
                                    1138,
                                    1250,
                                    1138,
                                    1269,
                                    630,
                                    1269
                                ],
                                "id": 51,
                                "score": 0.98400002717972,
                                "type": "line",
                                "text": "companies [5,57]. Graph visualization offers an interactive and ex-"
                            },
                            {
                                "pos": [
                                    630,
                                    1271,
                                    1134,
                                    1271,
                                    1134,
                                    1289,
                                    630,
                                    1289
                                ],
                                "id": 52,
                                "score": 0.98900002241135,
                                "type": "line",
                                "text": "ploratory means allowing users to gain structural insights [2] and sense"
                            },
                            {
                                "pos": [
                                    630,
                                    1291,
                                    1134,
                                    1291,
                                    1134,
                                    1309,
                                    630,
                                    1309
                                ],
                                "id": 53,
                                "score": 0.98299998044968,
                                "type": "line",
                                "text": "implicit contextual features of networks. However, with the increase"
                            },
                            {
                                "pos": [
                                    630,
                                    1309,
                                    1136,
                                    1311,
                                    1136,
                                    1331,
                                    630,
                                    1329
                                ],
                                "id": 54,
                                "score": 0.98400002717972,
                                "type": "line",
                                "text": "of data sizes, the visual exploration and analysis of networks are se-"
                            },
                            {
                                "pos": [
                                    630,
                                    1331,
                                    1134,
                                    1331,
                                    1134,
                                    1349,
                                    630,
                                    1349
                                ],
                                "id": 55,
                                "score": 0.99500000476837,
                                "type": "line",
                                "text": "riously influenced,because nodes and edges overlap with each other"
                            },
                            {
                                "pos": [
                                    630,
                                    1351,
                                    1134,
                                    1351,
                                    1134,
                                    1370,
                                    630,
                                    1370
                                ],
                                "id": 56,
                                "score": 0.9879999756813,
                                "type": "line",
                                "text": "and generate much visual clutter in large graph visualizations, making"
                            },
                            {
                                "pos": [
                                    630,
                                    1370,
                                    1134,
                                    1370,
                                    1134,
                                    1388,
                                    630,
                                    1388
                                ],
                                "id": 57,
                                "score": 0.99099999666214,
                                "type": "line",
                                "text": "it a complicated and time-consuming task to visually explore structural"
                            },
                            {
                                "pos": [
                                    630,
                                    1390,
                                    837,
                                    1390,
                                    837,
                                    1408,
                                    630,
                                    1408
                                ],
                                "id": 58,
                                "score": 0.99000000953674,
                                "type": "line",
                                "text": "features of significance [50]."
                            },
                            {
                                "pos": [
                                    649,
                                    1408,
                                    1136,
                                    1408,
                                    1136,
                                    1431,
                                    649,
                                    1431
                                ],
                                "id": 59,
                                "score": 0.99299997091293,
                                "type": "line",
                                "text": "Graph sampling is commonly used to reduce thevisual clutter and"
                            },
                            {
                                "pos": [
                                    630,
                                    1430,
                                    1136,
                                    1430,
                                    1136,
                                    1448,
                                    630,
                                    1448
                                ],
                                "id": 60,
                                "score": 0.99400001764297,
                                "type": "line",
                                "text": "address scalability issues in the visual exploration of large networks,"
                            },
                            {
                                "pos": [
                                    630,
                                    1450,
                                    1134,
                                    1450,
                                    1134,
                                    1469,
                                    630,
                                    1469
                                ],
                                "id": 61,
                                "score": 0.98699998855591,
                                "type": "line",
                                "text": "by means of which a subset of nodes and edges are selected on behalf"
                            },
                            {
                                "pos": [
                                    630,
                                    1470,
                                    1136,
                                    1470,
                                    1136,
                                    1489,
                                    630,
                                    1489
                                ],
                                "id": 62,
                                "score": 0.98299998044968,
                                "type": "line",
                                "text": "of the original large graph. Over the past few decades, numerous ef-"
                            },
                            {
                                "pos": [
                                    49,
                                    1541,
                                    1173,
                                    1541,
                                    1173,
                                    1558,
                                    49,
                                    1558
                                ],
                                "id": 63,
                                "score": 0.99299997091293,
                                "type": "line",
                                "text": "1077-2626(c)2020 IEEE.Personal use is permitted,but republication/redistribution requires IEEE permission.See http://www.ieee.org/publications_standards/publications/rights/index.html for more information."
                            },
                            {
                                "pos": [
                                    154,
                                    1557,
                                    1063,
                                    1557,
                                    1063,
                                    1574,
                                    154,
                                    1574
                                ],
                                "id": 64,
                                "score": 0.99000000953674,
                                "type": "line",
                                "text": "Authorized licensed use limited to:Carleton University. Downloaded on November 01,2020 at 18:44:07 UTC from IEEE Xplore. Restrictions apply."
                            }
                        ],
                        "status": "Success",
                        "height": 1584,
                        "structured": [
                            {
                                "content": [
                                    0
                                ],
                                "pos": [
                                    38,
                                    5,
                                    1184,
                                    5,
                                    1184,
                                    24,
                                    38,
                                    24
                                ],
                                "type": "textblock"
                            },
                            {
                                "content": [
                                    1
                                ],
                                "pos": [
                                    465,
                                    25,
                                    757,
                                    25,
                                    757,
                                    42,
                                    465,
                                    42
                                ],
                                "type": "textblock"
                            },
                            {
                                "content": [
                                    2
                                ],
                                "pos": [
                                    206,
                                    111,
                                    1034,
                                    113,
                                    1034,
                                    155,
                                    206,
                                    153
                                ],
                                "type": "textblock"
                            },
                            {
                                "content": [
                                    3
                                ],
                                "pos": [
                                    429,
                                    157,
                                    813,
                                    157,
                                    813,
                                    199,
                                    429,
                                    199
                                ],
                                "type": "textblock"
                            },
                            {
                                "content": [
                                    4
                                ],
                                "pos": [
                                    313,
                                    220,
                                    926,
                                    220,
                                    926,
                                    248,
                                    313,
                                    248
                                ],
                                "type": "textblock"
                            },
                            {
                                "content": [
                                    5
                                ],
                                "pos": [
                                    457,
                                    246,
                                    785,
                                    246,
                                    785,
                                    273,
                                    457,
                                    273
                                ],
                                "type": "textblock"
                            },
                            {
                                "content": [
                                    14
                                ],
                                "pos": [
                                    173,
                                    284,
                                    1076,
                                    284,
                                    1076,
                                    716,
                                    171,
                                    715
                                ],
                                "lines": [
                                    6,
                                    7,
                                    8,
                                    9,
                                    10,
                                    11,
                                    12,
                                    13
                                ],
                                "type": "image"
                            },
                            {
                                "content": [
                                    15,
                                    16,
                                    17,
                                    18,
                                    19,
                                    20
                                ],
                                "pos": [
                                    152,
                                    728,
                                    1088,
                                    728,
                                    1088,
                                    842,
                                    152,
                                    842
                                ],
                                "type": "textblock"
                            },
                            {
                                "content": [
                                    21,
                                    22,
                                    23,
                                    24,
                                    25,
                                    26,
                                    27,
                                    28,
                                    29,
                                    30,
                                    31
                                ],
                                "pos": [
                                    152,
                                    856,
                                    1088,
                                    856,
                                    1088,
                                    1065,
                                    152,
                                    1065
                                ],
                                "type": "textblock"
                            },
                            {
                                "content": [
                                    32
                                ],
                                "pos": [
                                    151,
                                    1071,
                                    879,
                                    1071,
                                    879,
                                    1094,
                                    151,
                                    1094
                                ],
                                "type": "textblock"
                            },
                            {
                                "content": [
                                    34
                                ],
                                "pos": [
                                    383,
                                    1108,
                                    846,
                                    1106,
                                    846,
                                    1139,
                                    382,
                                    1141
                                ],
                                "lines": [
                                    33
                                ],
                                "type": "image"
                            },
                            {
                                "content": [
                                    35
                                ],
                                "pos": [
                                    104,
                                    1158,
                                    260,
                                    1158,
                                    260,
                                    1181,
                                    104,
                                    1181
                                ],
                                "type": "textblock",
                                "sub_type": "list"
                            },
                            {
                                "content": [
                                    36,
                                    37,
                                    38,
                                    39
                                ],
                                "pos": [
                                    110,
                                    1229,
                                    602,
                                    1229,
                                    602,
                                    1305,
                                    110,
                                    1305
                                ],
                                "type": "textblock"
                            },
                            {
                                "content": [
                                    40
                                ],
                                "pos": [
                                    110,
                                    1308,
                                    608,
                                    1308,
                                    608,
                                    1326,
                                    110,
                                    1326
                                ],
                                "type": "textblock",
                                "sub_type": "list"
                            },
                            {
                                "content": [
                                    41
                                ],
                                "pos": [
                                    110,
                                    1327,
                                    562,
                                    1329,
                                    562,
                                    1348,
                                    110,
                                    1346
                                ],
                                "type": "textblock",
                                "sub_type": "list"
                            },
                            {
                                "content": [
                                    42
                                ],
                                "pos": [
                                    127,
                                    1348,
                                    347,
                                    1348,
                                    347,
                                    1366,
                                    127,
                                    1366
                                ],
                                "type": "textblock"
                            },
                            {
                                "content": [
                                    43
                                ],
                                "pos": [
                                    112,
                                    1368,
                                    465,
                                    1368,
                                    465,
                                    1387,
                                    112,
                                    1387
                                ],
                                "type": "textblock",
                                "sub_type": "list"
                            },
                            {
                                "content": [
                                    44,
                                    45,
                                    46,
                                    47
                                ],
                                "pos": [
                                    104,
                                    1394,
                                    608,
                                    1394,
                                    608,
                                    1470,
                                    104,
                                    1470
                                ],
                                "continue": true,
                                "type": "textblock"
                            },
                            {
                                "content": [
                                    48,
                                    49,
                                    50,
                                    51,
                                    52,
                                    53,
                                    54,
                                    55,
                                    56,
                                    57,
                                    58
                                ],
                                "pos": [
                                    630,
                                    1190,
                                    1138,
                                    1190,
                                    1138,
                                    1408,
                                    630,
                                    1408
                                ],
                                "type": "textblock"
                            },
                            {
                                "content": [
                                    59,
                                    60,
                                    61,
                                    62
                                ],
                                "pos": [
                                    630,
                                    1408,
                                    1136,
                                    1408,
                                    1136,
                                    1489,
                                    630,
                                    1489
                                ],
                                "type": "textblock"
                            },
                            {
                                "pos": [
                                    49,
                                    1541,
                                    1173,
                                    1541,
                                    1173,
                                    1574,
                                    49,
                                    1574
                                ],
                                "blocks": [
                                    {
                                        "content": [
                                            63,
                                            64
                                        ],
                                        "pos": [
                                            49,
                                            1541,
                                            1173,
                                            1541,
                                            1173,
                                            1574,
                                            49,
                                            1574
                                        ],
                                        "type": "textblock"
                                    }
                                ],
                                "type": "footer"
                            }
                        ],
                        "durations": 919.52838134766,
                        "image_id": "",
                        "width": 1224
                    },
                    {
                        "angle": 0,
                        "page_id": 2,
                        "content": [
                            {
                                "pos": [
                                    38,
                                    5,
                                    1184,
                                    5,
                                    1184,
                                    24,
                                    38,
                                    24
                                ],
                                "id": 0,
                                "score": 0.98699998855591,
                                "type": "line",
                                "text": "This article has been accepted for publication in a future issue of tis journal, but has not been fully edited. Content may change prior to final publication. Citation information: DOI 10.1109/TVCG.2020.3030440, IEEE"
                            },
                            {
                                "pos": [
                                    465,
                                    25,
                                    757,
                                    25,
                                    757,
                                    42,
                                    465,
                                    42
                                ],
                                "id": 1,
                                "score": 0.99800002574921,
                                "type": "line",
                                "text": "Transactions on Visualization and Computer Graphics"
                            },
                            {
                                "pos": [
                                    87,
                                    104,
                                    591,
                                    104,
                                    591,
                                    123,
                                    87,
                                    123
                                ],
                                "id": 2,
                                "score": 0.99099999666214,
                                "type": "line",
                                "text": "forts have been paid on the design of sampling strategies, ranging from"
                            },
                            {
                                "pos": [
                                    87,
                                    124,
                                    591,
                                    124,
                                    591,
                                    143,
                                    87,
                                    143
                                ],
                                "id": 3,
                                "score": 0.99199998378754,
                                "type": "line",
                                "text": "node-based and edge-based schemes [4,26] to transversal-based and"
                            },
                            {
                                "pos": [
                                    87,
                                    144,
                                    591,
                                    144,
                                    591,
                                    163,
                                    87,
                                    163
                                ],
                                "id": 4,
                                "score": 0.98000001907349,
                                "type": "line",
                                "text": "semantic-based schemes [4,23,56]. However, such strategies largely"
                            },
                            {
                                "pos": [
                                    87,
                                    165,
                                    593,
                                    165,
                                    593,
                                    183,
                                    87,
                                    183
                                ],
                                "id": 5,
                                "score": 0.98600000143051,
                                "type": "line",
                                "text": "focus on sampling efficiency and randomness of sampling results, pay-"
                            },
                            {
                                "pos": [
                                    87,
                                    185,
                                    593,
                                    185,
                                    593,
                                    203,
                                    87,
                                    203
                                ],
                                "id": 6,
                                "score": 0.99299997091293,
                                "type": "line",
                                "text": "ing little attention to the preservation of significant contextual struc-"
                            },
                            {
                                "pos": [
                                    87,
                                    205,
                                    130,
                                    205,
                                    130,
                                    222,
                                    87,
                                    222
                                ],
                                "id": 7,
                                "score": 0.9990000128746,
                                "type": "line",
                                "text": "tures."
                            },
                            {
                                "pos": [
                                    106,
                                    223,
                                    595,
                                    223,
                                    595,
                                    247,
                                    106,
                                    247
                                ],
                                "id": 8,
                                "score": 0.99000000953674,
                                "type": "line",
                                "text": "Contextual structures, formed by nodes and edges with tight rela-"
                            },
                            {
                                "pos": [
                                    87,
                                    247,
                                    593,
                                    247,
                                    593,
                                    265,
                                    87,
                                    265
                                ],
                                "id": 9,
                                "score": 0.98900002241135,
                                "type": "line",
                                "text": "tionships, are always of great significance for the exploration and in-"
                            },
                            {
                                "pos": [
                                    87,
                                    267,
                                    591,
                                    267,
                                    591,
                                    285,
                                    87,
                                    285
                                ],
                                "id": 10,
                                "score": 0.98900002241135,
                                "type": "line",
                                "text": "terpretation of networks, such as bridging nodes, connected paths and"
                            },
                            {
                                "pos": [
                                    86,
                                    284,
                                    593,
                                    284,
                                    593,
                                    307,
                                    86,
                                    307
                                ],
                                "id": 11,
                                "score": 0.98600000143051,
                                "type": "line",
                                "text": "aggregated communities [19,46].For example, it is quite necessary to"
                            },
                            {
                                "pos": [
                                    87,
                                    307,
                                    591,
                                    305,
                                    591,
                                    324,
                                    87,
                                    326
                                ],
                                "id": 12,
                                "score": 0.99400001764297,
                                "type": "line",
                                "text": "identify the contextual structures of crowd movement network for the"
                            },
                            {
                                "pos": [
                                    87,
                                    326,
                                    593,
                                    324,
                                    593,
                                    344,
                                    87,
                                    346
                                ],
                                "id": 13,
                                "score": 0.9879999756813,
                                "type": "line",
                                "text": "diagnosis and spread prevention of infectious diseases [44]. Howev-"
                            },
                            {
                                "pos": [
                                    87,
                                    347,
                                    591,
                                    345,
                                    592,
                                    364,
                                    87,
                                    366
                                ],
                                "id": 14,
                                "score": 0.98500001430511,
                                "type": "line",
                                "text": "er, it is a tough task to preserve contextual structures in the sampled"
                            },
                            {
                                "pos": [
                                    87,
                                    366,
                                    591,
                                    366,
                                    591,
                                    384,
                                    87,
                                    384
                                ],
                                "id": 15,
                                "score": 0.98900002241135,
                                "type": "line",
                                "text": "network based on traditional sampling strategies, because contextual"
                            },
                            {
                                "pos": [
                                    87,
                                    386,
                                    593,
                                    386,
                                    593,
                                    404,
                                    87,
                                    404
                                ],
                                "id": 16,
                                "score": 0.98299998044968,
                                "type": "line",
                                "text": "structures often have three characteristics: concealment in location, ir-"
                            },
                            {
                                "pos": [
                                    86,
                                    406,
                                    591,
                                    406,
                                    591,
                                    424,
                                    86,
                                    424
                                ],
                                "id": 17,
                                "score": 0.98600000143051,
                                "type": "line",
                                "text": "regularity in scale, and complexity in structure. For example, nodes"
                            },
                            {
                                "pos": [
                                    86,
                                    426,
                                    591,
                                    426,
                                    591,
                                    444,
                                    86,
                                    444
                                ],
                                "id": 18,
                                "score": 0.98400002717972,
                                "type": "line",
                                "text": "with tight relationships (in a community) may be difficult to find in"
                            },
                            {
                                "pos": [
                                    87,
                                    443,
                                    595,
                                    445,
                                    595,
                                    465,
                                    87,
                                    463
                                ],
                                "id": 19,
                                "score": 0.98699998855591,
                                "type": "line",
                                "text": "large networks due to their concealed locations, because they are eas-"
                            },
                            {
                                "pos": [
                                    87,
                                    465,
                                    591,
                                    465,
                                    591,
                                    483,
                                    87,
                                    483
                                ],
                                "id": 20,
                                "score": 0.99000000953674,
                                "type": "line",
                                "text": "ily laid out far away from each other. Also, contextual structures are"
                            },
                            {
                                "pos": [
                                    87,
                                    485,
                                    591,
                                    485,
                                    591,
                                    503,
                                    87,
                                    503
                                ],
                                "id": 21,
                                "score": 0.99000000953674,
                                "type": "line",
                                "text": "immune to scale, that is few nodes and edges would rather present a"
                            },
                            {
                                "pos": [
                                    87,
                                    505,
                                    593,
                                    505,
                                    593,
                                    523,
                                    87,
                                    523
                                ],
                                "id": 22,
                                "score": 0.99500000476837,
                                "type": "line",
                                "text": "tough contextual structure (a small complete graph). Thus,it is re-"
                            },
                            {
                                "pos": [
                                    87,
                                    525,
                                    591,
                                    525,
                                    591,
                                    544,
                                    87,
                                    544
                                ],
                                "id": 23,
                                "score": 0.99199998378754,
                                "type": "line",
                                "text": "ally hard to give a comprehensive definition of contextual structures"
                            },
                            {
                                "pos": [
                                    86,
                                    544,
                                    591,
                                    544,
                                    591,
                                    567,
                                    86,
                                    567
                                ],
                                "id": 24,
                                "score": 0.99099999666214,
                                "type": "line",
                                "text": "because their formations are too complicated to find a regular pattern."
                            },
                            {
                                "pos": [
                                    107,
                                    568,
                                    591,
                                    568,
                                    591,
                                    587,
                                    107,
                                    587
                                ],
                                "id": 25,
                                "score": 0.99000000953674,
                                "type": "line",
                                "text": "As an effective way to represent and identify contextual structures"
                            },
                            {
                                "pos": [
                                    87,
                                    588,
                                    591,
                                    588,
                                    591,
                                    607,
                                    87,
                                    607
                                ],
                                "id": 26,
                                "score": 0.98299998044968,
                                "type": "line",
                                "text": "of large networks [5], GRL has been widely applied in a variety of"
                            },
                            {
                                "pos": [
                                    87,
                                    608,
                                    593,
                                    608,
                                    593,
                                    627,
                                    87,
                                    627
                                ],
                                "id": 27,
                                "score": 0.98199999332428,
                                "type": "line",
                                "text": "research areas, such as graph classification, graph query, graph min-"
                            },
                            {
                                "pos": [
                                    86,
                                    625,
                                    593,
                                    625,
                                    593,
                                    649,
                                    86,
                                    649
                                ],
                                "id": 28,
                                "score": 0.99000000953674,
                                "type": "line",
                                "text": "ing,et al [12,33]. It transforms nodes into vectors to quantitate the"
                            },
                            {
                                "pos": [
                                    87,
                                    647,
                                    593,
                                    647,
                                    593,
                                    666,
                                    87,
                                    666
                                ],
                                "id": 29,
                                "score": 0.9879999756813,
                                "type": "line",
                                "text": "structural features of networks. Numerous GRL models have been pro-"
                            },
                            {
                                "pos": [
                                    87,
                                    667,
                                    591,
                                    667,
                                    591,
                                    686,
                                    87,
                                    686
                                ],
                                "id": 30,
                                "score": 0.99500000476837,
                                "type": "line",
                                "text": "posed to train and represent nodes according to their local contexts in"
                            },
                            {
                                "pos": [
                                    86,
                                    684,
                                    595,
                                    684,
                                    595,
                                    707,
                                    86,
                                    707
                                ],
                                "id": 31,
                                "score": 0.98199999332428,
                                "type": "line",
                                "text": "the network, such as deepwalk [39],node2vec [11],and struc2vec [42]."
                            },
                            {
                                "pos": [
                                    87,
                                    707,
                                    591,
                                    707,
                                    591,
                                    726,
                                    87,
                                    726
                                ],
                                "id": 32,
                                "score": 0.99000000953674,
                                "type": "line",
                                "text": "A family of biased random walks are developed in the course of corpus"
                            },
                            {
                                "pos": [
                                    87,
                                    728,
                                    591,
                                    728,
                                    591,
                                    746,
                                    87,
                                    746
                                ],
                                "id": 33,
                                "score": 0.99599999189377,
                                "type": "line",
                                "text": "generation allowing an efficient exploration of diverse neighborhoods"
                            },
                            {
                                "pos": [
                                    86,
                                    745,
                                    593,
                                    745,
                                    593,
                                    768,
                                    86,
                                    768
                                ],
                                "id": 34,
                                "score": 0.9879999756813,
                                "type": "line",
                                "text": "for given nodes [32]. Thus,network structures are well represented"
                            },
                            {
                                "pos": [
                                    86,
                                    765,
                                    593,
                                    765,
                                    593,
                                    788,
                                    86,
                                    788
                                ],
                                "id": 35,
                                "score": 0.97399997711182,
                                "type": "line",
                                "text": "in a vectroized space obtained by GRL (e.g. a contextual structure of"
                            },
                            {
                                "pos": [
                                    86,
                                    785,
                                    595,
                                    785,
                                    595,
                                    808,
                                    86,
                                    808
                                ],
                                "id": 36,
                                "score": 0.98600000143051,
                                "type": "line",
                                "text": "interest is highlighted as shown in Figure la and Figure 1c). We be-"
                            },
                            {
                                "pos": [
                                    86,
                                    805,
                                    593,
                                    805,
                                    593,
                                    828,
                                    86,
                                    828
                                ],
                                "id": 37,
                                "score": 0.99299997091293,
                                "type": "line",
                                "text": "lieve that it would be a feasible way to conduct graph sampling in the"
                            },
                            {
                                "pos": [
                                    86,
                                    825,
                                    593,
                                    825,
                                    593,
                                    848,
                                    86,
                                    848
                                ],
                                "id": 38,
                                "score": 0.99000000953674,
                                "type": "line",
                                "text": "vectorized space, and the contextual structures would be preserved as"
                            },
                            {
                                "pos": [
                                    87,
                                    847,
                                    591,
                                    847,
                                    591,
                                    865,
                                    87,
                                    865
                                ],
                                "id": 39,
                                "score": 0.98699998855591,
                                "type": "line",
                                "text": "far as possible (e.g. the contextual structure is well preserved in the"
                            },
                            {
                                "pos": [
                                    86,
                                    865,
                                    474,
                                    865,
                                    474,
                                    888,
                                    86,
                                    888
                                ],
                                "id": 40,
                                "score": 0.98400002717972,
                                "type": "line",
                                "text": "sampled graph as shown in Figure 1d and Figure 1b)."
                            },
                            {
                                "pos": [
                                    106,
                                    887,
                                    595,
                                    887,
                                    595,
                                    910,
                                    106,
                                    910
                                ],
                                "id": 41,
                                "score": 0.99000000953674,
                                "type": "line",
                                "text": "However,there are still severa problems to overcome for the p-"
                            },
                            {
                                "pos": [
                                    87,
                                    909,
                                    591,
                                    909,
                                    591,
                                    927,
                                    87,
                                    927
                                ],
                                "id": 42,
                                "score": 0.99699997901917,
                                "type": "line",
                                "text": "reservation of contextual structures in the vectorized space obtained"
                            },
                            {
                                "pos": [
                                    87,
                                    929,
                                    591,
                                    929,
                                    591,
                                    947,
                                    87,
                                    947
                                ],
                                "id": 43,
                                "score": 0.97600001096725,
                                "type": "line",
                                "text": "through GRL.P1: GRL is able to encode the contextual structures"
                            },
                            {
                                "pos": [
                                    86,
                                    949,
                                    593,
                                    949,
                                    593,
                                    967,
                                    86,
                                    967
                                ],
                                "id": 44,
                                "score": 0.98699998855591,
                                "type": "line",
                                "text": "with vectorizied representation, but the vectorized space is too compli-"
                            },
                            {
                                "pos": [
                                    86,
                                    966,
                                    593,
                                    966,
                                    593,
                                    989,
                                    86,
                                    989
                                ],
                                "id": 45,
                                "score": 0.9879999756813,
                                "type": "line",
                                "text": "cated to gaininsights due to its high dimensions. P2: It is a difficult"
                            },
                            {
                                "pos": [
                                    87,
                                    989,
                                    591,
                                    989,
                                    591,
                                    1008,
                                    87,
                                    1008
                                ],
                                "id": 46,
                                "score": 0.99500000476837,
                                "type": "line",
                                "text": "task to define a graph sampling model to preserve contextual structures"
                            },
                            {
                                "pos": [
                                    87,
                                    1009,
                                    591,
                                    1009,
                                    591,
                                    1028,
                                    87,
                                    1028
                                ],
                                "id": 47,
                                "score": 0.99299997091293,
                                "type": "line",
                                "text": "captured by GRL,since they are represented with data distributions in"
                            },
                            {
                                "pos": [
                                    87,
                                    1029,
                                    593,
                                    1029,
                                    593,
                                    1048,
                                    87,
                                    1048
                                ],
                                "id": 48,
                                "score": 0.9879999756813,
                                "type": "line",
                                "text": "the vectorized space rather than topological relationships in the origi-"
                            },
                            {
                                "pos": [
                                    87,
                                    1049,
                                    591,
                                    1049,
                                    591,
                                    1068,
                                    87,
                                    1068
                                ],
                                "id": 49,
                                "score": 0.97899997234344,
                                "type": "line",
                                "text": "nal network space. P3: It is also difficult to conduct a unified graph"
                            },
                            {
                                "pos": [
                                    87,
                                    1069,
                                    591,
                                    1069,
                                    591,
                                    1088,
                                    87,
                                    1088
                                ],
                                "id": 50,
                                "score": 0.99599999189377,
                                "type": "line",
                                "text": "sampling scheme to preserve various kinds of contextual structures in"
                            },
                            {
                                "pos": [
                                    86,
                                    1086,
                                    593,
                                    1086,
                                    593,
                                    1110,
                                    86,
                                    1110
                                ],
                                "id": 51,
                                "score": 0.99099999666214,
                                "type": "line",
                                "text": "the vectorized space due to their respective characteristics. P4: It is"
                            },
                            {
                                "pos": [
                                    86,
                                    1110,
                                    591,
                                    1110,
                                    591,
                                    1128,
                                    86,
                                    1128
                                ],
                                "id": 52,
                                "score": 0.99000000953674,
                                "type": "line",
                                "text": "another tough task to evaluate the sampled graphs from a variety of"
                            },
                            {
                                "pos": [
                                    87,
                                    1128,
                                    591,
                                    1128,
                                    591,
                                    1147,
                                    87,
                                    1147
                                ],
                                "id": 53,
                                "score": 0.99599999189377,
                                "type": "line",
                                "text": "perspectives,and further demonstrate that the contextual structures of"
                            },
                            {
                                "pos": [
                                    87,
                                    1148,
                                    466,
                                    1148,
                                    466,
                                    1167,
                                    87,
                                    1167
                                ],
                                "id": 54,
                                "score": 0.99199998378754,
                                "type": "line",
                                "text": "significance are well retained in the sampled graphs."
                            },
                            {
                                "pos": [
                                    106,
                                    1168,
                                    595,
                                    1168,
                                    595,
                                    1192,
                                    106,
                                    1192
                                ],
                                "id": 55,
                                "score": 0.98600000143051,
                                "type": "line",
                                "text": "In this paper, we propose a novel graph sampling method to simpli-"
                            },
                            {
                                "pos": [
                                    86,
                                    1189,
                                    593,
                                    1189,
                                    593,
                                    1212,
                                    86,
                                    1212
                                ],
                                "id": 56,
                                "score": 0.98699998855591,
                                "type": "line",
                                "text": "fy large graphs, especially with the contextual structures identified and"
                            },
                            {
                                "pos": [
                                    86,
                                    1209,
                                    593,
                                    1209,
                                    593,
                                    1232,
                                    86,
                                    1232
                                ],
                                "id": 57,
                                "score": 0.98600000143051,
                                "type": "line",
                                "text": "preserved in the sampled graphs. Firstly, a GRL model is employed to"
                            },
                            {
                                "pos": [
                                    86,
                                    1231,
                                    591,
                                    1230,
                                    591,
                                    1249,
                                    86,
                                    1250
                                ],
                                "id": 58,
                                "score": 0.98699998855591,
                                "type": "line",
                                "text": "encode contextual structures and a dimensionality reduction method is"
                            },
                            {
                                "pos": [
                                    87,
                                    1252,
                                    591,
                                    1250,
                                    591,
                                    1269,
                                    87,
                                    1271
                                ],
                                "id": 59,
                                "score": 0.99000000953674,
                                "type": "line",
                                "text": "applied to transform the contextual structures into a low-dimensional"
                            },
                            {
                                "pos": [
                                    87,
                                    1271,
                                    591,
                                    1269,
                                    591,
                                    1289,
                                    87,
                                    1291
                                ],
                                "id": 60,
                                "score": 0.99500000476837,
                                "type": "line",
                                "text": "vectorized space,where nodes sharing similar contextual features are"
                            },
                            {
                                "pos": [
                                    87,
                                    1291,
                                    591,
                                    1291,
                                    591,
                                    1309,
                                    87,
                                    1309
                                ],
                                "id": 61,
                                "score": 0.97600001096725,
                                "type": "line",
                                "text": "visually distributed close to each other (P1). Then, we propose a novel"
                            },
                            {
                                "pos": [
                                    87,
                                    1311,
                                    593,
                                    1311,
                                    593,
                                    1329,
                                    87,
                                    1329
                                ],
                                "id": 62,
                                "score": 0.99400001764297,
                                "type": "line",
                                "text": "blue noise sampling model to generate a subset of nodes in the vec-"
                            },
                            {
                                "pos": [
                                    87,
                                    1331,
                                    593,
                                    1331,
                                    593,
                                    1349,
                                    87,
                                    1349
                                ],
                                "id": 63,
                                "score": 0.99099999666214,
                                "type": "line",
                                "text": "torized space, guaranteeing that nodes with tight relationships are re-"
                            },
                            {
                                "pos": [
                                    86,
                                    1348,
                                    593,
                                    1348,
                                    593,
                                    1371,
                                    86,
                                    1371
                                ],
                                "id": 64,
                                "score": 0.98699998855591,
                                "type": "line",
                                "text": "tained and the contextual features are well preserved in the sampled"
                            },
                            {
                                "pos": [
                                    86,
                                    1368,
                                    593,
                                    1368,
                                    593,
                                    1391,
                                    86,
                                    1391
                                ],
                                "id": 65,
                                "score": 0.98400002717972,
                                "type": "line",
                                "text": "graph (P2). A set of desired objectives are further integrated into the"
                            },
                            {
                                "pos": [
                                    86,
                                    1388,
                                    593,
                                    1388,
                                    593,
                                    1411,
                                    86,
                                    1411
                                ],
                                "id": 66,
                                "score": 0.98900002241135,
                                "type": "line",
                                "text": "sampling model to optimize the sampled graphs, in which topological"
                            },
                            {
                                "pos": [
                                    86,
                                    1408,
                                    593,
                                    1408,
                                    593,
                                    1431,
                                    86,
                                    1431
                                ],
                                "id": 67,
                                "score": 0.9879999756813,
                                "type": "line",
                                "text": "features of significance are enhanced such as bridging nodes and graph"
                            },
                            {
                                "pos": [
                                    87,
                                    1430,
                                    593,
                                    1430,
                                    593,
                                    1448,
                                    87,
                                    1448
                                ],
                                "id": 68,
                                "score": 0.97799998521805,
                                "type": "line",
                                "text": "connection (P3). Also, we utilize a group of metrics to evaluate the va-"
                            },
                            {
                                "pos": [
                                    87,
                                    1450,
                                    591,
                                    1450,
                                    591,
                                    1469,
                                    87,
                                    1469
                                ],
                                "id": 69,
                                "score": 0.98900002241135,
                                "type": "line",
                                "text": "lidity of our sampling method in contextual feature preservation from"
                            },
                            {
                                "pos": [
                                    87,
                                    1470,
                                    591,
                                    1470,
                                    591,
                                    1489,
                                    87,
                                    1489
                                ],
                                "id": 70,
                                "score": 0.9879999756813,
                                "type": "line",
                                "text": "different perspectives, such as node importance, graph connection and"
                            },
                            {
                                "pos": [
                                    612,
                                    104,
                                    1119,
                                    104,
                                    1119,
                                    123,
                                    612,
                                    123
                                ],
                                "id": 71,
                                "score": 0.98199999332428,
                                "type": "line",
                                "text": "community changes (P4). At last, a graph sampling framework is im-"
                            },
                            {
                                "pos": [
                                    613,
                                    124,
                                    1117,
                                    124,
                                    1117,
                                    143,
                                    613,
                                    143
                                ],
                                "id": 72,
                                "score": 0.9879999756813,
                                "type": "line",
                                "text": "plemented to integrate sampling models, GRL and visual designs of"
                            },
                            {
                                "pos": [
                                    613,
                                    144,
                                    1116,
                                    144,
                                    1116,
                                    163,
                                    613,
                                    163
                                ],
                                "id": 73,
                                "score": 0.97799998521805,
                                "type": "line",
                                "text": "metrics, and a rich set of interactions are also provided allowing users"
                            },
                            {
                                "pos": [
                                    613,
                                    165,
                                    1116,
                                    165,
                                    1116,
                                    183,
                                    613,
                                    183
                                ],
                                "id": 74,
                                "score": 0.99400001764297,
                                "type": "line",
                                "text": "to intuitively evaluate different sampling strategies and easily explore"
                            },
                            {
                                "pos": [
                                    612,
                                    185,
                                    1119,
                                    185,
                                    1119,
                                    203,
                                    612,
                                    203
                                ],
                                "id": 75,
                                "score": 0.99400001764297,
                                "type": "line",
                                "text": "structures of interest in large networks. The effectiveness and use-"
                            },
                            {
                                "pos": [
                                    613,
                                    205,
                                    1116,
                                    205,
                                    1116,
                                    222,
                                    613,
                                    222
                                ],
                                "id": 76,
                                "score": 0.99500000476837,
                                "type": "line",
                                "text": "fulness of our system are further demonstrated with case studies and"
                            },
                            {
                                "pos": [
                                    613,
                                    223,
                                    1116,
                                    223,
                                    1116,
                                    242,
                                    613,
                                    242
                                ],
                                "id": 77,
                                "score": 0.98699998855591,
                                "type": "line",
                                "text": "quantitate comparisons based on real-world datasets. In summary, the"
                            },
                            {
                                "pos": [
                                    612,
                                    243,
                                    870,
                                    243,
                                    870,
                                    260,
                                    612,
                                    260
                                ],
                                "id": 78,
                                "score": 0.99299997091293,
                                "type": "line",
                                "text": "main contributions of our work are:"
                            },
                            {
                                "pos": [
                                    638,
                                    285,
                                    1119,
                                    285,
                                    1119,
                                    304,
                                    638,
                                    304
                                ],
                                "id": 79,
                                "score": 0.98699998855591,
                                "type": "line",
                                "text": "·We utilize a GRL model (node2vec) to quantitate the contextu-"
                            },
                            {
                                "pos": [
                                    652,
                                    305,
                                    1119,
                                    305,
                                    1119,
                                    324,
                                    652,
                                    324
                                ],
                                "id": 80,
                                "score": 0.9879999756813,
                                "type": "line",
                                "text": "al features of networks, offering important clues for graph sam-"
                            },
                            {
                                "pos": [
                                    650,
                                    322,
                                    1117,
                                    322,
                                    1117,
                                    346,
                                    650,
                                    346
                                ],
                                "id": 81,
                                "score": 0.98500001430511,
                                "type": "line",
                                "text": "pling. To the best of our knowledge, it is the first to sample"
                            },
                            {
                                "pos": [
                                    650,
                                    343,
                                    786,
                                    341,
                                    787,
                                    364,
                                    650,
                                    366
                                ],
                                "id": 82,
                                "score": 0.99599999189377,
                                "type": "line",
                                "text": "graphs with GRL."
                            },
                            {
                                "pos": [
                                    639,
                                    380,
                                    1120,
                                    380,
                                    1120,
                                    403,
                                    639,
                                    403
                                ],
                                "id": 83,
                                "score": 0.99000000953674,
                                "type": "line",
                                "text": "·We design a multi-objective blue noise sampling model to simpli-"
                            },
                            {
                                "pos": [
                                    650,
                                    400,
                                    1120,
                                    400,
                                    1120,
                                    423,
                                    650,
                                    423
                                ],
                                "id": 84,
                                "score": 0.99099999666214,
                                "type": "line",
                                "text": "fy large networks, with the contextual structures and their topo-"
                            },
                            {
                                "pos": [
                                    652,
                                    421,
                                    1028,
                                    421,
                                    1028,
                                    440,
                                    652,
                                    440
                                ],
                                "id": 85,
                                "score": 0.9879999756813,
                                "type": "line",
                                "text": "logical features well retained in the sampled graphs."
                            },
                            {
                                "pos": [
                                    642,
                                    457,
                                    1120,
                                    457,
                                    1120,
                                    480,
                                    642,
                                    480
                                ],
                                "id": 86,
                                "score": 0.98400002717972,
                                "type": "line",
                                "text": "We propose a group of specific metrics enabling users to com-"
                            },
                            {
                                "pos": [
                                    652,
                                    480,
                                    1116,
                                    480,
                                    1116,
                                    499,
                                    652,
                                    499
                                ],
                                "id": 87,
                                "score": 0.9879999756813,
                                "type": "line",
                                "text": "pare sampling strategies from different perspectives, and conduct"
                            },
                            {
                                "pos": [
                                    650,
                                    499,
                                    1117,
                                    499,
                                    1117,
                                    517,
                                    650,
                                    517
                                ],
                                "id": 88,
                                "score": 0.99299997091293,
                                "type": "line",
                                "text": "case studies with real-world datasets to demonstrate the validity"
                            },
                            {
                                "pos": [
                                    652,
                                    519,
                                    981,
                                    519,
                                    981,
                                    537,
                                    652,
                                    537
                                ],
                                "id": 89,
                                "score": 0.99400001764297,
                                "type": "line",
                                "text": "of our context-aware graph sampling method."
                            },
                            {
                                "pos": [
                                    610,
                                    556,
                                    783,
                                    556,
                                    783,
                                    581,
                                    610,
                                    581
                                ],
                                "id": 90,
                                "score": 0.99299997091293,
                                "type": "line",
                                "text": "2 RELATED WORK"
                            },
                            {
                                "pos": [
                                    610,
                                    584,
                                    1117,
                                    585,
                                    1117,
                                    608,
                                    610,
                                    607
                                ],
                                "id": 91,
                                "score": 0.99699997901917,
                                "type": "line",
                                "text": "We classify existing methods into four categories,including large"
                            },
                            {
                                "pos": [
                                    612,
                                    607,
                                    1116,
                                    607,
                                    1116,
                                    625,
                                    612,
                                    625
                                ],
                                "id": 92,
                                "score": 0.98600000143051,
                                "type": "line",
                                "text": "graph visualization, graph sampling, metrics for graph evaluation and"
                            },
                            {
                                "pos": [
                                    612,
                                    627,
                                    830,
                                    627,
                                    830,
                                    646,
                                    612,
                                    646
                                ],
                                "id": 93,
                                "score": 0.99699997901917,
                                "type": "line",
                                "text": "graph representation learning."
                            },
                            {
                                "pos": [
                                    610,
                                    660,
                                    885,
                                    660,
                                    885,
                                    684,
                                    610,
                                    684
                                ],
                                "id": 94,
                                "score": 0.99299997091293,
                                "type": "line",
                                "text": "2.1 Large Graph Visualization"
                            },
                            {
                                "pos": [
                                    612,
                                    687,
                                    1119,
                                    687,
                                    1119,
                                    711,
                                    612,
                                    711
                                ],
                                "id": 95,
                                "score": 0.9879999756813,
                                "type": "line",
                                "text": "Graph visualization is widely used for network analysis [5].Node-link"
                            },
                            {
                                "pos": [
                                    612,
                                    709,
                                    1119,
                                    709,
                                    1119,
                                    728,
                                    612,
                                    728
                                ],
                                "id": 96,
                                "score": 0.9879999756813,
                                "type": "line",
                                "text": "diagram is a most intuitive layout scheme in which the nodes are rep-"
                            },
                            {
                                "pos": [
                                    612,
                                    729,
                                    1117,
                                    729,
                                    1117,
                                    748,
                                    612,
                                    748
                                ],
                                "id": 97,
                                "score": 0.98699998855591,
                                "type": "line",
                                "text": "resented as points and edges are represented as lines. Force-directed"
                            },
                            {
                                "pos": [
                                    613,
                                    749,
                                    1116,
                                    749,
                                    1116,
                                    768,
                                    613,
                                    768
                                ],
                                "id": 98,
                                "score": 0.98699998855591,
                                "type": "line",
                                "text": "methods are employed to layout the node-link diagrams by optimizing"
                            },
                            {
                                "pos": [
                                    612,
                                    769,
                                    1119,
                                    769,
                                    1119,
                                    788,
                                    612,
                                    788
                                ],
                                "id": 99,
                                "score": 0.98500001430511,
                                "type": "line",
                                "text": "graph drawing aesthetics [10,19,41]. With the increasing size of net-"
                            },
                            {
                                "pos": [
                                    612,
                                    789,
                                    1117,
                                    789,
                                    1117,
                                    808,
                                    612,
                                    808
                                ],
                                "id": 100,
                                "score": 0.98299998044968,
                                "type": "line",
                                "text": "works, the readability of node-link diagrams largely decreases due to"
                            },
                            {
                                "pos": [
                                    610,
                                    806,
                                    1119,
                                    806,
                                    1119,
                                    830,
                                    610,
                                    830
                                ],
                                "id": 101,
                                "score": 0.99000000953674,
                                "type": "line",
                                "text": "visual clutter and scalability issues [9]. Two categories of methods are"
                            },
                            {
                                "pos": [
                                    612,
                                    830,
                                    1117,
                                    830,
                                    1117,
                                    848,
                                    612,
                                    848
                                ],
                                "id": 102,
                                "score": 0.98699998855591,
                                "type": "line",
                                "text": "proposed: (1) Graph clustering methods aggregate groups of nodes"
                            },
                            {
                                "pos": [
                                    612,
                                    850,
                                    1117,
                                    850,
                                    1117,
                                    868,
                                    612,
                                    868
                                ],
                                "id": 103,
                                "score": 0.99000000953674,
                                "type": "line",
                                "text": "and edges with similar properties to reduce the visual complexity of"
                            },
                            {
                                "pos": [
                                    610,
                                    867,
                                    1117,
                                    867,
                                    1117,
                                    890,
                                    610,
                                    890
                                ],
                                "id": 104,
                                "score": 0.98299998044968,
                                "type": "line",
                                "text": "large graphs [7,58]. ASK-GraphView [1] was proposed to organize"
                            },
                            {
                                "pos": [
                                    610,
                                    887,
                                    1119,
                                    887,
                                    1119,
                                    910,
                                    610,
                                    910
                                ],
                                "id": 105,
                                "score": 0.99199998378754,
                                "type": "line",
                                "text": "a large graph into hierarchical structures allowing users to aggregate"
                            },
                            {
                                "pos": [
                                    612,
                                    909,
                                    1119,
                                    909,
                                    1119,
                                    927,
                                    612,
                                    927
                                ],
                                "id": 106,
                                "score": 0.99199998378754,
                                "type": "line",
                                "text": "nodes to reduce visual clutter. To reduce edge crossings and empha-"
                            },
                            {
                                "pos": [
                                    612,
                                    929,
                                    1117,
                                    929,
                                    1117,
                                    947,
                                    612,
                                    947
                                ],
                                "id": 107,
                                "score": 0.99299997091293,
                                "type": "line",
                                "text": "size directional patterns, a set of edge-based clustering methods are"
                            },
                            {
                                "pos": [
                                    612,
                                    949,
                                    1116,
                                    949,
                                    1116,
                                    967,
                                    612,
                                    967
                                ],
                                "id": 108,
                                "score": 0.99099999666214,
                                "type": "line",
                                "text": "proposed in which edges with similar spatial distribution features are"
                            },
                            {
                                "pos": [
                                    613,
                                    969,
                                    1117,
                                    969,
                                    1117,
                                    987,
                                    613,
                                    987
                                ],
                                "id": 109,
                                "score": 0.97899997234344,
                                "type": "line",
                                "text": "bundled together [6,8,15,16]. (2) Graph filtering methods extract"
                            },
                            {
                                "pos": [
                                    610,
                                    986,
                                    1119,
                                    986,
                                    1119,
                                    1009,
                                    610,
                                    1009
                                ],
                                "id": 110,
                                "score": 0.98100000619888,
                                "type": "line",
                                "text": "subgraphs of interest from original large graphs [20]. Hennessey et"
                            },
                            {
                                "pos": [
                                    612,
                                    1008,
                                    1119,
                                    1008,
                                    1119,
                                    1026,
                                    612,
                                    1026
                                ],
                                "id": 111,
                                "score": 0.97899997234344,
                                "type": "line",
                                "text": "al. [14] took a set of graph metrics into account to obtain representa-"
                            },
                            {
                                "pos": [
                                    612,
                                    1028,
                                    1117,
                                    1028,
                                    1117,
                                    1046,
                                    612,
                                    1046
                                ],
                                "id": 112,
                                "score": 0.98299998044968,
                                "type": "line",
                                "text": "tive skeletons and simplify the visualization of large graphs, such as"
                            },
                            {
                                "pos": [
                                    612,
                                    1048,
                                    1117,
                                    1048,
                                    1117,
                                    1066,
                                    612,
                                    1066
                                ],
                                "id": 113,
                                "score": 0.98600000143051,
                                "type": "line",
                                "text": "shortest path and distance to the central node. Yoghourdjian et al. [51]"
                            },
                            {
                                "pos": [
                                    612,
                                    1068,
                                    1119,
                                    1066,
                                    1119,
                                    1086,
                                    612,
                                    1088
                                ],
                                "id": 114,
                                "score": 0.98600000143051,
                                "type": "line",
                                "text": "proposed Graph Thumbnails to enhance the readability of large graph-"
                            },
                            {
                                "pos": [
                                    612,
                                    1088,
                                    1117,
                                    1088,
                                    1117,
                                    1107,
                                    612,
                                    1107
                                ],
                                "id": 115,
                                "score": 0.99099999666214,
                                "type": "line",
                                "text": "s with high-level structures described with small icon-like glyphs.It"
                            },
                            {
                                "pos": [
                                    612,
                                    1108,
                                    1116,
                                    1108,
                                    1116,
                                    1127,
                                    612,
                                    1127
                                ],
                                "id": 116,
                                "score": 0.99299997091293,
                                "type": "line",
                                "text": "can be seen that the underlying topological structures of networks are"
                            },
                            {
                                "pos": [
                                    612,
                                    1128,
                                    1116,
                                    1128,
                                    1116,
                                    1147,
                                    612,
                                    1147
                                ],
                                "id": 117,
                                "score": 0.99199998378754,
                                "type": "line",
                                "text": "changed with clustering methods,which are still not preserved in the"
                            },
                            {
                                "pos": [
                                    612,
                                    1148,
                                    1116,
                                    1148,
                                    1116,
                                    1167,
                                    612,
                                    1167
                                ],
                                "id": 118,
                                "score": 0.98699998855591,
                                "type": "line",
                                "text": "simplified graphs with filteringmethods. It might generate a great deal"
                            },
                            {
                                "pos": [
                                    610,
                                    1165,
                                    1048,
                                    1165,
                                    1048,
                                    1189,
                                    610,
                                    1189
                                ],
                                "id": 119,
                                "score": 0.98900002241135,
                                "type": "line",
                                "text": "of ambiguity that misleads the exploration of networks [49]."
                            },
                            {
                                "pos": [
                                    612,
                                    1201,
                                    803,
                                    1201,
                                    803,
                                    1224,
                                    612,
                                    1224
                                ],
                                "id": 120,
                                "score": 0.98500001430511,
                                "type": "line",
                                "text": "2.2 Graph Sampling"
                            },
                            {
                                "pos": [
                                    612,
                                    1229,
                                    1120,
                                    1229,
                                    1120,
                                    1252,
                                    612,
                                    1252
                                ],
                                "id": 121,
                                "score": 0.98600000143051,
                                "type": "line",
                                "text": "Graph sampling is another kind of filtering method, which also gen-"
                            },
                            {
                                "pos": [
                                    612,
                                    1252,
                                    1119,
                                    1252,
                                    1119,
                                    1271,
                                    612,
                                    1271
                                ],
                                "id": 122,
                                "score": 0.99199998378754,
                                "type": "line",
                                "text": "erates a subset of nodes or edges to simplify the original networks."
                            },
                            {
                                "pos": [
                                    613,
                                    1271,
                                    1116,
                                    1271,
                                    1116,
                                    1289,
                                    613,
                                    1289
                                ],
                                "id": 123,
                                "score": 0.98600000143051,
                                "type": "line",
                                "text": "Three categories are covered: (1) Node-based Sampling. Random"
                            },
                            {
                                "pos": [
                                    613,
                                    1291,
                                    1117,
                                    1291,
                                    1117,
                                    1309,
                                    613,
                                    1309
                                ],
                                "id": 124,
                                "score": 0.97500002384186,
                                "type": "line",
                                "text": "Node Sampling (RNS) [26] is commonly used to randomly generate"
                            },
                            {
                                "pos": [
                                    612,
                                    1311,
                                    1119,
                                    1311,
                                    1119,
                                    1329,
                                    612,
                                    1329
                                ],
                                "id": 125,
                                "score": 0.99199998378754,
                                "type": "line",
                                "text": "nodes from the original network. A set of graph properties are con-"
                            },
                            {
                                "pos": [
                                    612,
                                    1331,
                                    1117,
                                    1331,
                                    1117,
                                    1349,
                                    612,
                                    1349
                                ],
                                "id": 126,
                                "score": 0.99000000953674,
                                "type": "line",
                                "text": "sidered to improve the results of node-based sampling. For example,"
                            },
                            {
                                "pos": [
                                    613,
                                    1349,
                                    1117,
                                    1349,
                                    1117,
                                    1368,
                                    613,
                                    1368
                                ],
                                "id": 127,
                                "score": 0.98000001907349,
                                "type": "line",
                                "text": "Random PageRank Node (RPN) defines the probability of nodes to be"
                            },
                            {
                                "pos": [
                                    612,
                                    1371,
                                    1116,
                                    1369,
                                    1116,
                                    1388,
                                    612,
                                    1390
                                ],
                                "id": 128,
                                "score": 0.98299998044968,
                                "type": "line",
                                "text": "sampled as proportional to their PageRank weights [26,36]. Random"
                            },
                            {
                                "pos": [
                                    613,
                                    1390,
                                    1119,
                                    1390,
                                    1119,
                                    1408,
                                    613,
                                    1408
                                ],
                                "id": 129,
                                "score": 0.9879999756813,
                                "type": "line",
                                "text": "Degree Node (RDN) increases the probability of nodes with higher de-"
                            },
                            {
                                "pos": [
                                    613,
                                    1409,
                                    1116,
                                    1410,
                                    1116,
                                    1430,
                                    613,
                                    1428
                                ],
                                "id": 130,
                                "score": 0.97399997711182,
                                "type": "line",
                                "text": "gree values to be sampled [4]. Hu et al. [18] designed a graph sampling"
                            },
                            {
                                "pos": [
                                    613,
                                    1430,
                                    1116,
                                    1430,
                                    1116,
                                    1448,
                                    613,
                                    1448
                                ],
                                "id": 131,
                                "score": 0.99299997091293,
                                "type": "line",
                                "text": "method based on spectral sparsification, to reduce the number of edges"
                            },
                            {
                                "pos": [
                                    612,
                                    1450,
                                    1116,
                                    1450,
                                    1116,
                                    1469,
                                    612,
                                    1469
                                ],
                                "id": 132,
                                "score": 0.98100000619888,
                                "type": "line",
                                "text": "and retain structural properties of original graphs. (2) Edge-based"
                            },
                            {
                                "pos": [
                                    612,
                                    1470,
                                    1117,
                                    1470,
                                    1117,
                                    1489,
                                    612,
                                    1489
                                ],
                                "id": 133,
                                "score": 0.98299998044968,
                                "type": "line",
                                "text": "Sampling. Random Edge Sampling (RES) extracts a random subset of"
                            },
                            {
                                "pos": [
                                    49,
                                    1541,
                                    1173,
                                    1541,
                                    1173,
                                    1558,
                                    49,
                                    1558
                                ],
                                "id": 134,
                                "score": 0.99199998378754,
                                "type": "line",
                                "text": "1077-2626 (c) 2020 IEEE.Personal use is permitted,but republication/redistribution requires IEEE permission.See http://www.ieee.org/publications_standards/publications/rights/index.html for more information."
                            },
                            {
                                "pos": [
                                    154,
                                    1557,
                                    1063,
                                    1557,
                                    1063,
                                    1574,
                                    154,
                                    1574
                                ],
                                "id": 135,
                                "score": 0.9879999756813,
                                "type": "line",
                                "text": "Authorized licensed use limited to: Carleton University. Downloaded on November 01,2020 at 18:44:07 UTC from IEEE Xplore. Restrictions apply."
                            }
                        ],
                        "status": "Success",
                        "height": 1584,
                        "structured": [
                            {
                                "content": [
                                    0
                                ],
                                "pos": [
                                    38,
                                    5,
                                    1184,
                                    5,
                                    1184,
                                    24,
                                    38,
                                    24
                                ],
                                "type": "textblock"
                            },
                            {
                                "content": [
                                    1
                                ],
                                "pos": [
                                    465,
                                    25,
                                    757,
                                    25,
                                    757,
                                    42,
                                    465,
                                    42
                                ],
                                "type": "textblock"
                            },
                            {
                                "content": [
                                    2,
                                    3,
                                    4,
                                    5,
                                    6,
                                    7
                                ],
                                "pos": [
                                    87,
                                    104,
                                    593,
                                    104,
                                    593,
                                    222,
                                    87,
                                    222
                                ],
                                "type": "textblock"
                            },
                            {
                                "content": [
                                    8,
                                    9,
                                    10,
                                    11,
                                    12,
                                    13,
                                    14,
                                    15,
                                    16,
                                    17,
                                    18,
                                    19,
                                    20,
                                    21,
                                    22,
                                    23,
                                    24
                                ],
                                "pos": [
                                    86,
                                    223,
                                    595,
                                    223,
                                    595,
                                    567,
                                    86,
                                    567
                                ],
                                "type": "textblock"
                            },
                            {
                                "content": [
                                    25,
                                    26,
                                    27,
                                    28,
                                    29,
                                    30,
                                    31,
                                    32,
                                    33,
                                    34,
                                    35,
                                    36,
                                    37,
                                    38,
                                    39,
                                    40
                                ],
                                "pos": [
                                    86,
                                    568,
                                    595,
                                    568,
                                    595,
                                    888,
                                    86,
                                    888
                                ],
                                "type": "textblock"
                            },
                            {
                                "content": [
                                    41,
                                    42,
                                    43,
                                    44,
                                    45,
                                    46,
                                    47,
                                    48,
                                    49,
                                    50,
                                    51,
                                    52,
                                    53,
                                    54
                                ],
                                "pos": [
                                    86,
                                    887,
                                    595,
                                    887,
                                    595,
                                    1167,
                                    86,
                                    1167
                                ],
                                "type": "textblock"
                            },
                            {
                                "content": [
                                    55,
                                    56,
                                    57,
                                    58,
                                    59,
                                    60,
                                    61,
                                    62,
                                    63,
                                    64,
                                    65,
                                    66,
                                    67,
                                    68,
                                    69,
                                    70
                                ],
                                "pos": [
                                    86,
                                    1168,
                                    595,
                                    1168,
                                    595,
                                    1489,
                                    86,
                                    1489
                                ],
                                "continue": true,
                                "type": "textblock"
                            },
                            {
                                "content": [
                                    71,
                                    72,
                                    73,
                                    74,
                                    75,
                                    76,
                                    77,
                                    78
                                ],
                                "pos": [
                                    612,
                                    104,
                                    1119,
                                    104,
                                    1119,
                                    260,
                                    612,
                                    260
                                ],
                                "type": "textblock"
                            },
                            {
                                "content": [
                                    79,
                                    80,
                                    81,
                                    82
                                ],
                                "pos": [
                                    638,
                                    285,
                                    1119,
                                    285,
                                    1119,
                                    366,
                                    638,
                                    366
                                ],
                                "type": "textblock",
                                "sub_type": "list"
                            },
                            {
                                "content": [
                                    83,
                                    84,
                                    85
                                ],
                                "pos": [
                                    639,
                                    380,
                                    1120,
                                    380,
                                    1120,
                                    440,
                                    639,
                                    440
                                ],
                                "type": "textblock",
                                "sub_type": "list"
                            },
                            {
                                "content": [
                                    86,
                                    87,
                                    88,
                                    89
                                ],
                                "pos": [
                                    642,
                                    457,
                                    1120,
                                    457,
                                    1120,
                                    537,
                                    642,
                                    537
                                ],
                                "type": "textblock",
                                "sub_type": "list"
                            },
                            {
                                "content": [
                                    90
                                ],
                                "pos": [
                                    610,
                                    556,
                                    783,
                                    556,
                                    783,
                                    581,
                                    610,
                                    581
                                ],
                                "type": "textblock",
                                "sub_type": "list"
                            },
                            {
                                "content": [
                                    91,
                                    92,
                                    93
                                ],
                                "pos": [
                                    610,
                                    584,
                                    1117,
                                    584,
                                    1117,
                                    646,
                                    610,
                                    646
                                ],
                                "type": "textblock"
                            },
                            {
                                "content": [
                                    94
                                ],
                                "pos": [
                                    610,
                                    660,
                                    885,
                                    660,
                                    885,
                                    684,
                                    610,
                                    684
                                ],
                                "type": "textblock",
                                "sub_type": "list"
                            },
                            {
                                "content": [
                                    95,
                                    96,
                                    97,
                                    98,
                                    99,
                                    100,
                                    101,
                                    102,
                                    103,
                                    104,
                                    105,
                                    106,
                                    107,
                                    108,
                                    109,
                                    110,
                                    111,
                                    112,
                                    113,
                                    114,
                                    115,
                                    116,
                                    117,
                                    118,
                                    119
                                ],
                                "pos": [
                                    610,
                                    687,
                                    1119,
                                    687,
                                    1119,
                                    1189,
                                    610,
                                    1189
                                ],
                                "type": "textblock"
                            },
                            {
                                "content": [
                                    120
                                ],
                                "pos": [
                                    612,
                                    1201,
                                    803,
                                    1201,
                                    803,
                                    1224,
                                    612,
                                    1224
                                ],
                                "type": "textblock",
                                "sub_type": "list"
                            },
                            {
                                "content": [
                                    121,
                                    122,
                                    123,
                                    124,
                                    125,
                                    126,
                                    127,
                                    128,
                                    129,
                                    130,
                                    131,
                                    132,
                                    133
                                ],
                                "pos": [
                                    612,
                                    1229,
                                    1120,
                                    1229,
                                    1120,
                                    1489,
                                    612,
                                    1489
                                ],
                                "type": "textblock"
                            },
                            {
                                "pos": [
                                    49,
                                    1541,
                                    1173,
                                    1541,
                                    1173,
                                    1574,
                                    49,
                                    1574
                                ],
                                "blocks": [
                                    {
                                        "content": [
                                            134,
                                            135
                                        ],
                                        "pos": [
                                            49,
                                            1541,
                                            1173,
                                            1541,
                                            1173,
                                            1574,
                                            49,
                                            1574
                                        ],
                                        "type": "textblock"
                                    }
                                ],
                                "type": "footer"
                            }
                        ],
                        "durations": 1250.73828125,
                        "image_id": "",
                        "width": 1224
                    }
                ],
                "valid_page_number": 2,
                "total_page_number": 2,
                "total_count": 2,
                "detail": [
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 0,
                        "page_id": 1,
                        "content": 0,
                        "position": [
                            39,
                            6,
                            1182,
                            6,
                            1182,
                            21,
                            39,
                            21
                        ],
                        "outline_level": -1,
                        "text": "This article has been accepted for publication in a future issue of this journal, but has not been fully edited. Content may chane prior to final publication. Citation information: DOI 10.1109/TVCG.2020.3030440,IEEE"
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 1,
                        "page_id": 1,
                        "content": 0,
                        "position": [
                            467,
                            26,
                            756,
                            26,
                            756,
                            41,
                            467,
                            41
                        ],
                        "outline_level": -1,
                        "text": "Transactions on Visualization and Computer Graphics"
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 2,
                        "page_id": 1,
                        "content": 0,
                        "position": [
                            206,
                            111,
                            1032,
                            111,
                            1032,
                            153,
                            206,
                            153
                        ],
                        "outline_level": 0,
                        "text": "Context-aware Sampling of Large Networks via Graph"
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 3,
                        "page_id": 1,
                        "content": 0,
                        "position": [
                            429,
                            157,
                            811,
                            157,
                            811,
                            197,
                            429,
                            197
                        ],
                        "outline_level": -1,
                        "text": "Representation Learning"
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 4,
                        "page_id": 1,
                        "content": 0,
                        "position": [
                            313,
                            221,
                            925,
                            221,
                            925,
                            247,
                            313,
                            247
                        ],
                        "outline_level": -1,
                        "text": "Zhiguang Zhou, Chen Shi, Xilong Shen, Lihong Cai, Haoxuan Wang,"
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 5,
                        "page_id": 1,
                        "content": 0,
                        "position": [
                            458,
                            247,
                            782,
                            247,
                            782,
                            271,
                            458,
                            271
                        ],
                        "outline_level": -1,
                        "text": "Yuhua Liu,Ying Zhao and Wei Chen"
                    },
                    {
                        "type": "image",
                        "text": "a. C. b. d. e. g. f. h. ",
                        "paragraph_id": 6,
                        "page_id": 1,
                        "content": 0,
                        "position": [
                            171,
                            285,
                            1074,
                            285,
                            1074,
                            714,
                            171,
                            714
                        ],
                        "outline_level": -1,
                        "image_url": "https://textin-image-store-1303028177.cos.ap-shanghai.myqcloud.com/external/e616a02f49d8d2cb"
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 7,
                        "page_id": 1,
                        "content": 0,
                        "position": [
                            153,
                            728,
                            1087,
                            728,
                            1087,
                            839,
                            153,
                            839
                        ],
                        "outline_level": -1,
                        "text": "Fig. 1. A case for a Webbase data (16k nodes, 26k edges) based on our context-aware sampling method. (a) presents the original graph with a node-link diagram. (c) presents scatterplots obtained through GRL (node2vec) and dimensionality reduction (t-SNE). (e)highlights a local structure of interest in (a), and the circled nodes are of significance. (g) presents an aggregated layout of (a), in which each supernode represents a community feature. Our sampling method is conducted on (c), and the sampled scatterplots are presented in (d) with a contextual structure of interest highlighted by a red circle. (b) presents the corresponding sampled graph, with the significant features retained such as bridging nodes highlighted in (f) and graph connections presented in (h)."
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 8,
                        "page_id": 1,
                        "content": 0,
                        "position": [
                            153,
                            857,
                            1087,
                            857,
                            1087,
                            1063,
                            153,
                            1063
                        ],
                        "outline_level": -1,
                        "text": "Abstract-Numerous sampling strategies have been proposed to simplify large-scale networks for highly readable visualizations. It is of great challenge to preserve contextual structures formed by nodes and edges with tight relationships in a sampled graph, because they are easily overlooked during the process of sampling due to their irregular distribution and immunity to scale. In this paper,a new graph sampling method is proposed oriented to the preservation of contextual structures. We first utilize a graph representation learning (GRL) model to transform nodes into vectors so that the contextual structures in a network can be effectively extracted and organized. Then, we propose a multi-objective blue noise sampling model to select a subset of nodes in the vectorized space to preserve contextual structures with the retention of relative data and cluster densities in addition to those features of significance,such as bridging nodes and graph connections. We also design a set of visual interfaces enabling users to interactively conduct context-aware sampling, visually compare results with various sampling strategies, and deeply explore large networks. Case studies and quantitative comparisons based on real-world datasets have demonstrated the effectiveness of our method in the abstraction and exploration of large networks."
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 9,
                        "page_id": 1,
                        "content": 0,
                        "position": [
                            151,
                            1072,
                            877,
                            1072,
                            877,
                            1092,
                            151,
                            1092
                        ],
                        "outline_level": -1,
                        "text": "Index Terms-Graph sampling, Graph representation learning, Blue noise sampling, Graph evaluation"
                    },
                    {
                        "type": "image",
                        "text": " ",
                        "paragraph_id": 10,
                        "page_id": 1,
                        "content": 0,
                        "position": [
                            383,
                            1107,
                            844,
                            1107,
                            844,
                            1140,
                            383,
                            1140
                        ],
                        "outline_level": -1,
                        "image_url": "https://textin-image-store-1303028177.cos.ap-shanghai.myqcloud.com/external/84c42c140c4b3212"
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 11,
                        "page_id": 1,
                        "content": 0,
                        "position": [
                            105,
                            1160,
                            258,
                            1160,
                            258,
                            1179,
                            105,
                            1179
                        ],
                        "outline_level": 1,
                        "text": "1 INTRODUCTION"
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 12,
                        "page_id": 1,
                        "content": 0,
                        "position": [
                            111,
                            1230,
                            600,
                            1230,
                            600,
                            1304,
                            111,
                            1304
                        ],
                        "outline_level": -1,
                        "text": "·Zhiguang Zhou, Chen Shi,Xilong Shen,Lihong Cai,Haoxuan Wang and Yuhua Liu are with School of Information,Zhejiang University of Finance and Economics. E-mail: {zhgzhou1983, shichen, 180110910420,cailihong,wanghaoxuan,liuyuhua}@zufe.edu.cn."
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 13,
                        "page_id": 1,
                        "content": 0,
                        "position": [
                            111,
                            1309,
                            607,
                            1309,
                            607,
                            1324,
                            111,
                            1324
                        ],
                        "outline_level": -1,
                        "text": "·Ying Zhao is with Central South University. E-mail:zhaoying@csu.edu.cn."
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 14,
                        "page_id": 1,
                        "content": 0,
                        "position": [
                            111,
                            1329,
                            561,
                            1329,
                            561,
                            1346,
                            111,
                            1346
                        ],
                        "outline_level": -1,
                        "text": "·Wei Chen is with State Key Lab of CAD & CG, Zhejiang University."
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 18,
                        "page_id": 1,
                        "content": 0,
                        "position": [
                            127,
                            1348,
                            346,
                            1348,
                            346,
                            1364,
                            127,
                            1364
                        ],
                        "outline_level": -1,
                        "text": "E-mail:chenwei@cad.zju.edu.cn."
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 19,
                        "page_id": 1,
                        "content": 0,
                        "position": [
                            114,
                            1368,
                            464,
                            1368,
                            464,
                            1386,
                            114,
                            1386
                        ],
                        "outline_level": -1,
                        "text": "·Ying Zhao and Wei Chen are corresponding authors."
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 20,
                        "page_id": 1,
                        "content": 0,
                        "position": [
                            105,
                            1394,
                            607,
                            1394,
                            607,
                            1469,
                            105,
                            1469
                        ],
                        "outline_level": -1,
                        "text": "Manuscript received xx xxx. 201x; accepted xx xxx. 201x.Date of Publication xx xxx.201x;date of current version xx xxx. 201x. For information on obtaining reprints ofthis article, please send e-mail to: reprints@ieee.org.Digital Object Identifier: xx.xxxx/TVCG.201x.xxxxxxxx"
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 21,
                        "page_id": 1,
                        "content": 0,
                        "position": [
                            631,
                            1190,
                            1136,
                            1190,
                            1136,
                            1407,
                            631,
                            1407
                        ],
                        "outline_level": -1,
                        "text": "As a ubiquitous data structure, network is always employed to encode relationships among entities in a variety of application areas,such as social relationships between people and financial transactions between companies [5,57]. Graph visualization offers an interactive and ex-ploratory means allowing users to gain structural insights [2] and sense implicit contextual features of networks. However, with the increase of data sizes, the visual exploration and analysis of networks are se-riously influenced,because nodes and edges overlap with each other and generate much visual clutter in large graph visualizations, making it a complicated and time-consuming task to visually explore structural features of significance [50]."
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 22,
                        "page_id": 1,
                        "content": 0,
                        "position": [
                            631,
                            1410,
                            1133,
                            1410,
                            1133,
                            1486,
                            631,
                            1486
                        ],
                        "outline_level": -1,
                        "text": "Graph sampling is commonly used to reduce thevisual clutter and address scalability issues in the visual exploration of large networks,by means of which a subset of nodes and edges are selected on behalf of the original large graph. Over the past few decades, numerous ef-"
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 24,
                        "page_id": 1,
                        "content": 1,
                        "position": [
                            50,
                            1541,
                            1171,
                            1541,
                            1171,
                            1572,
                            50,
                            1572
                        ],
                        "outline_level": -1,
                        "text": "1077-2626(c)2020 IEEE.Personal use is permitted,but republication/redistribution requires IEEE permission.See http://www.ieee.org/publications_standards/publications/rights/index.html for more information.Authorized licensed use limited to:Carleton University. Downloaded on November 01,2020 at 18:44:07 UTC from IEEE Xplore. Restrictions apply."
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 0,
                        "page_id": 2,
                        "content": 0,
                        "position": [
                            39,
                            6,
                            1182,
                            6,
                            1182,
                            21,
                            39,
                            21
                        ],
                        "outline_level": -1,
                        "text": "This article has been accepted for publication in a future issue of tis journal, but has not been fully edited. Content may change prior to final publication. Citation information: DOI 10.1109/TVCG.2020.3030440, IEEE"
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 1,
                        "page_id": 2,
                        "content": 0,
                        "position": [
                            467,
                            26,
                            756,
                            26,
                            756,
                            41,
                            467,
                            41
                        ],
                        "outline_level": -1,
                        "text": "Transactions on Visualization and Computer Graphics"
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 2,
                        "page_id": 2,
                        "content": 0,
                        "position": [
                            87,
                            105,
                            592,
                            105,
                            592,
                            221,
                            87,
                            221
                        ],
                        "outline_level": -1,
                        "text": "forts have been paid on the design of sampling strategies, ranging from node-based and edge-based schemes [4,26] to transversal-based and semantic-based schemes [4,23,56]. However, such strategies largely focus on sampling efficiency and randomness of sampling results, pay-ing little attention to the preservation of significant contextual struc-tures."
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 3,
                        "page_id": 2,
                        "content": 0,
                        "position": [
                            87,
                            223,
                            594,
                            223,
                            594,
                            565,
                            87,
                            565
                        ],
                        "outline_level": -1,
                        "text": "Contextual structures, formed by nodes and edges with tight rela-tionships, are always of great significance for the exploration and in-terpretation of networks, such as bridging nodes, connected paths and aggregated communities [19,46].For example, it is quite necessary to identify the contextual structures of crowd movement network for the diagnosis and spread prevention of infectious diseases [44]. Howev-er, it is a tough task to preserve contextual structures in the sampled network based on traditional sampling strategies, because contextual structures often have three characteristics: concealment in location, ir-regularity in scale, and complexity in structure. For example, nodes with tight relationships (in a community) may be difficult to find in large networks due to their concealed locations, because they are eas-ily laid out far away from each other. Also, contextual structures are immune to scale, that is few nodes and edges would rather present a tough contextual structure (a small complete graph). Thus,it is re-ally hard to give a comprehensive definition of contextual structures because their formations are too complicated to find a regular pattern."
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 4,
                        "page_id": 2,
                        "content": 0,
                        "position": [
                            87,
                            568,
                            594,
                            568,
                            594,
                            886,
                            87,
                            886
                        ],
                        "outline_level": -1,
                        "text": "As an effective way to represent and identify contextual structures of large networks [5], GRL has been widely applied in a variety of research areas, such as graph classification, graph query, graph min-ing,et al [12,33]. It transforms nodes into vectors to quantitate the structural features of networks. Numerous GRL models have been pro-posed to train and represent nodes according to their local contexts in the network, such as deepwalk [39],node2vec [11],and struc2vec [42].A family of biased random walks are developed in the course of corpus generation allowing an efficient exploration of diverse neighborhoods for given nodes [32]. Thus,network structures are well represented in a vectroized space obtained by GRL (e.g. a contextual structure of interest is highlighted as shown in Figure la and Figure 1c). We be-lieve that it would be a feasible way to conduct graph sampling in the vectorized space, and the contextual structures would be preserved as far as possible (e.g. the contextual structure is well preserved in the sampled graph as shown in Figure 1d and Figure 1b)."
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 5,
                        "page_id": 2,
                        "content": 0,
                        "position": [
                            87,
                            888,
                            594,
                            888,
                            594,
                            1166,
                            87,
                            1166
                        ],
                        "outline_level": -1,
                        "text": "However,there are still severa problems to overcome for the p-reservation of contextual structures in the vectorized space obtained through GRL.P1: GRL is able to encode the contextual structures with vectorizied representation, but the vectorized space is too compli-cated to gaininsights due to its high dimensions. P2: It is a difficult task to define a graph sampling model to preserve contextual structures captured by GRL,since they are represented with data distributions in the vectorized space rather than topological relationships in the origi-nal network space. P3: It is also difficult to conduct a unified graph sampling scheme to preserve various kinds of contextual structures in the vectorized space due to their respective characteristics. P4: It is another tough task to evaluate the sampled graphs from a variety of perspectives,and further demonstrate that the contextual structures of significance are well retained in the sampled graphs."
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 6,
                        "page_id": 2,
                        "content": 0,
                        "position": [
                            87,
                            1168,
                            594,
                            1168,
                            594,
                            1486,
                            87,
                            1486
                        ],
                        "outline_level": -1,
                        "text": "In this paper, we propose a novel graph sampling method to simpli-fy large graphs, especially with the contextual structures identified and preserved in the sampled graphs. Firstly, a GRL model is employed to encode contextual structures and a dimensionality reduction method is applied to transform the contextual structures into a low-dimensional vectorized space,where nodes sharing similar contextual features are visually distributed close to each other (P1). Then, we propose a novel blue noise sampling model to generate a subset of nodes in the vec-torized space, guaranteeing that nodes with tight relationships are re-tained and the contextual features are well preserved in the sampled graph (P2). A set of desired objectives are further integrated into the sampling model to optimize the sampled graphs, in which topological features of significance are enhanced such as bridging nodes and graph connection (P3). Also, we utilize a group of metrics to evaluate the va-lidity of our sampling method in contextual feature preservation from different perspectives, such as node importance, graph connection and"
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 7,
                        "page_id": 2,
                        "content": 0,
                        "position": [
                            614,
                            105,
                            1118,
                            105,
                            1118,
                            258,
                            614,
                            258
                        ],
                        "outline_level": -1,
                        "text": "community changes (P4). At last, a graph sampling framework is im-plemented to integrate sampling models, GRL and visual designs of metrics, and a rich set of interactions are also provided allowing users to intuitively evaluate different sampling strategies and easily explore structures of interest in large networks. The effectiveness and use-fulness of our system are further demonstrated with case studies and quantitate comparisons based on real-world datasets. In summary, the main contributions of our work are:"
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 8,
                        "page_id": 2,
                        "content": 0,
                        "position": [
                            638,
                            285,
                            1118,
                            285,
                            1118,
                            364,
                            638,
                            364
                        ],
                        "outline_level": -1,
                        "text": "·We utilize a GRL model (node2vec) to quantitate the contextu-al features of networks, offering important clues for graph sam-pling. To the best of our knowledge, it is the first to sample graphs with GRL."
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 9,
                        "page_id": 2,
                        "content": 0,
                        "position": [
                            640,
                            381,
                            1118,
                            381,
                            1118,
                            438,
                            640,
                            438
                        ],
                        "outline_level": -1,
                        "text": "·We design a multi-objective blue noise sampling model to simpli-fy large networks, with the contextual structures and their topo-logical features well retained in the sampled graphs."
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 10,
                        "page_id": 2,
                        "content": 0,
                        "position": [
                            642,
                            458,
                            1118,
                            458,
                            1118,
                            535,
                            642,
                            535
                        ],
                        "outline_level": -1,
                        "text": "We propose a group of specific metrics enabling users to com-pare sampling strategies from different perspectives, and conduct case studies with real-world datasets to demonstrate the validity of our context-aware graph sampling method."
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 11,
                        "page_id": 2,
                        "content": 0,
                        "position": [
                            611,
                            557,
                            782,
                            557,
                            782,
                            578,
                            611,
                            578
                        ],
                        "outline_level": 1,
                        "text": "2 RELATED WORK"
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 15,
                        "page_id": 2,
                        "content": 0,
                        "position": [
                            611,
                            585,
                            1116,
                            585,
                            1116,
                            644,
                            611,
                            644
                        ],
                        "outline_level": -1,
                        "text": "We classify existing methods into four categories,including large graph visualization, graph sampling, metrics for graph evaluation and graph representation learning."
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 16,
                        "page_id": 2,
                        "content": 0,
                        "position": [
                            611,
                            660,
                            883,
                            660,
                            883,
                            682,
                            611,
                            682
                        ],
                        "outline_level": 2,
                        "text": "2.1 Large Graph Visualization"
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 17,
                        "page_id": 2,
                        "content": 0,
                        "position": [
                            611,
                            688,
                            1118,
                            688,
                            1118,
                            1188,
                            611,
                            1188
                        ],
                        "outline_level": -1,
                        "text": "Graph visualization is widely used for network analysis [5].Node-link diagram is a most intuitive layout scheme in which the nodes are rep-resented as points and edges are represented as lines. Force-directed methods are employed to layout the node-link diagrams by optimizing graph drawing aesthetics [10,19,41]. With the increasing size of net-works, the readability of node-link diagrams largely decreases due to visual clutter and scalability issues [9]. Two categories of methods are proposed: (1) Graph clustering methods aggregate groups of nodes and edges with similar properties to reduce the visual complexity of large graphs [7,58]. ASK-GraphView [1] was proposed to organize a large graph into hierarchical structures allowing users to aggregate nodes to reduce visual clutter. To reduce edge crossings and empha-size directional patterns, a set of edge-based clustering methods are proposed in which edges with similar spatial distribution features are bundled together [6,8,15,16]. (2) Graph filtering methods extract subgraphs of interest from original large graphs [20]. Hennessey et al. [14] took a set of graph metrics into account to obtain representa-tive skeletons and simplify the visualization of large graphs, such as shortest path and distance to the central node. Yoghourdjian et al. [51]proposed Graph Thumbnails to enhance the readability of large graph-s with high-level structures described with small icon-like glyphs.It can be seen that the underlying topological structures of networks are changed with clustering methods,which are still not preserved in the simplified graphs with filteringmethods. It might generate a great deal of ambiguity that misleads the exploration of networks [49]."
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 18,
                        "page_id": 2,
                        "content": 0,
                        "position": [
                            614,
                            1201,
                            802,
                            1201,
                            802,
                            1223,
                            614,
                            1223
                        ],
                        "outline_level": 2,
                        "text": "2.2 Graph Sampling"
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 19,
                        "page_id": 2,
                        "content": 0,
                        "position": [
                            614,
                            1230,
                            1118,
                            1230,
                            1118,
                            1486,
                            614,
                            1486
                        ],
                        "outline_level": -1,
                        "text": "Graph sampling is another kind of filtering method, which also gen-erates a subset of nodes or edges to simplify the original networks.Three categories are covered: (1) Node-based Sampling. Random Node Sampling (RNS) [26] is commonly used to randomly generate nodes from the original network. A set of graph properties are con-sidered to improve the results of node-based sampling. For example,Random PageRank Node (RPN) defines the probability of nodes to be sampled as proportional to their PageRank weights [26,36]. Random Degree Node (RDN) increases the probability of nodes with higher de-gree values to be sampled [4]. Hu et al. [18] designed a graph sampling method based on spectral sparsification, to reduce the number of edges and retain structural properties of original graphs. (2) Edge-based Sampling. Random Edge Sampling (RES) extracts a random subset of"
                    },
                    {
                        "type": "paragraph",
                        "tags": [],
                        "paragraph_id": 21,
                        "page_id": 2,
                        "content": 1,
                        "position": [
                            50,
                            1541,
                            1171,
                            1541,
                            1171,
                            1572,
                            50,
                            1572
                        ],
                        "outline_level": -1,
                        "text": "1077-2626 (c) 2020 IEEE.Personal use is permitted,but republication/redistribution requires IEEE permission.See http://www.ieee.org/publications_standards/publications/rights/index.html for more information.Authorized licensed use limited to: Carleton University. Downloaded on November 01,2020 at 18:44:07 UTC from IEEE Xplore. Restrictions apply."
                    }
                ],
                "metrics": [
                    {
                        "angle": 0,
                        "status": "Success",
                        "dpi": 144,
                        "image_id": "",
                        "page_id": 1,
                        "duration": 948.17889404297,
                        "page_image_width": 1224,
                        "page_image_height": 1584
                    },
                    {
                        "angle": 0,
                        "status": "Success",
                        "dpi": 144,
                        "image_id": "",
                        "page_id": 2,
                        "duration": 1279.3887939453,
                        "page_image_width": 1224,
                        "page_image_height": 1584
                    }
                ],
                "dpi": 144
            }
        }
    });
}