import * as TWEEN from '@tweenjs/tween.js';
const CameraValues = new Map([

    //StartWorld
   ["StartPosition", {
        position: [-0.12462741678547615,0.6420106978915423,2.0182291457235637],
        rotation: [-0.11731097133277484,-0.020336115112565962,-0.0023964838806935515],
        Down: "StartWorldFromSpace",
        DownOnce: true,
        Up: "HeartCake",
        Specific:
            {
                "StartWorldFromSpace": 5000,
            },
        SpecificEasing:
            {
                "StartWorldFromSpace": TWEEN.Easing.Sinusoidal.In,
            }
    }],

    ["HeartCake", {
        position: [-0.007596609869273672,3.231307614763006,-0.668989715090381],
        rotation: [-1.2700516432254199,-0.011730261590950471,-0.03780207877052671],
        Down: "StartPosition",
    }],




    //All the Worlds from Space
    ["StartWorldFromSpace", {
        position: [0,2419.4644077683483,10142.194976122362], //z is radius
        rotation: [-0.2341775872675476,0,0],
        CameraLookAt: [0,0,0],
        Up: "StartPosition",
        Left: "DecemberWorld",
        Right: "JanuaryWorld",
        Down: "LookOut",
    }],
    ["JanuaryWorld", {
        position: [1451.324128434862,2173.7370689597556, 6657.163076588953], //z is radius
        rotation: [-0.38605384158581807,-0.5200828823988255,-0.19930433417559695],
        CameraLookAt: [-4713.222410867904,0,1161.7049878251473],
        Up: "JanuaryIn",
        Left: "StartWorldFromSpace",
        Right: "FebruaryWorld",
        Down: "LookOut",
    }],
    ["JanuaryIn", {
        position: [4713.019702783899,1.1121553421743025,1163.3276444370583], //z is radius
        rotation: [-0.06922215361082872,-0.019727247597948458,-0.0013676583131077846],
        Up: "JanuaryWorld",
        Specific:
            {
                "JanuaryWorld": 5000,
            },
    }],
    ["FebruaryWorld", {
        position: [2478.499685942066,1080.2596344163285,8884.476034655287], //z is radius
        rotation: [-0.23540858650229257,-0.9026393249691419,-0.18609973667725815],
        CameraLookAt: [-8346.702367893462,0,4380.687338652617],
        Up: "FebruaryIn",
        Left: "JanuaryWorld",
        Right: "MarchWorld",
        Down: "LookOut",
    }],
    ["FebruaryIn", {
        position: [8346.493461958547,1.1401162750213718,4382.214817114353], //z is radius
        rotation: [-0.17138898009294962,-0.01298934219504619,-0.00224822019706559],
        Up: "FebruaryWorld",
        Specific:
            {
                "FebruaryIn": 5000,
            },
    }],
    ["MarchWorld", {
        position: [490.4915670806604,1048.6665316241804,9634.984926072888],
        rotation: [-0.9720728230495884,-1.4390165109326665,-0.9680122684137606],
        CameraLookAt: [-10068.053401102465,0,8919.516988850517],
        Up: "MarchIn",
        Left: "FebruaryWorld",
        Right: "AprilWorld",
        Down: "LookOut",
    }],
    ["MarchIn", {
        position: [10067.718170717724,0.9954570946815269,8921.059558408662], //z is radius
        rotation: [0.04614146159578169,-0.009877075460548635,0.0004560589573910492],
        Up: "MarchWorld",
        Specific:
            {
                "MarchWorld": 5000,
            },
    }],
    ["AprilWorld", {
        position: [1788.8451994408924,872.571773465011,10796.629906573147],
        rotation: [-2.8532449316185238,-1.1913191473813445,-2.8727498938580163],
        CameraLookAt: [-9482.934733315476,0,13738.402764385395],
        Up: "AprilIn",
        Left: "MarchWorld",
        Right: "MayWorld",
        Down: "LookOut",
    }],
    ["AprilIn", {
        position: [9482.518019862584,1.038872386276979,13740.063553123715], //z is radius
        rotation: [-0.006591566939874788,-0.0032959956904487103,-0.00002172605154462867],
        Up: "AprilWorld",
        Specific:
            {
                "AprilWorld": 5000,
            },
    }],
    ["MayWorld", {
        position: [978.6282488389543,311.3752261634016,12366.619375354941],
        rotation: [-3.0836385841860015,-0.8187378158958216,-3.099247595897773],
        CameraLookAt: [-6725.389999878148,0,17733.396007951305],
        Up: "MayIn",
        Left: "AprilWorld",
        Right: "JuneWorld",
        Down: "LookOut",
    }],
    ["MayIn", {
        position: [6725.044424450325,1.0003552866275742,17734.95996170633], //z is radius
        rotation: [-0.08255248065373583,-0.0624047428329558,-0.005160004538254479],
        Up: "MayWorld",
        Specific:
            {
                "MayWorld": 5000,
            },
    }],
    ["JuneWorld", {
        position: [705.2642343866221,163.9087908587643,11888.507851951925],
        rotation: [-3.121361719532945,-0.20939794322811214,-3.1373866794104024],
        CameraLookAt: [-2427.1394672044025,0,19989.291912335022],
        Up: "JuneIn",
        Left: "MayWorld",
        Right: "JulyWorld",
        Down: "LookOut",
    }],
    ["JuneIn", {
        position: [2426.7660278596795,1.3165824975408604,19990.535182825897], //z is radius
        rotation: [-0.24736050534899368,-0.03834541927000612,-0.009680778553082966],
        Up: "JuneWorld",
        Specific:
            {
                "JuneWorld": 5000,
            },
    }],
    ["JulyWorld", {
        position: [26.837066928958393,114.82864793650353,11623.177232984031],
        rotation: [-3.127868070270245,0.2852947632386938,3.137729779244676],
        CameraLookAt: [2427.1394672044153,0,19989.29191233502],
        Up: "JulyIn",
        Left: "JuneWorld",
        Right: "AugustWorld",
        Down: "LookOut",
    }],
    ["JulyIn", {
        position: [-2427.400524991156,1.4583998772623035,19990.938679057763], //z is radius
        rotation: [-0.23407082576672916,0.02564627316209728,0.006114388902793832],
        Up: "JulyWorld",
        Specific:
            {
                "JulyWorld": 5000,
            },
    }],
    ["AugustWorld", {
        position: [-536.892984816126,596.3851761510472,12909.357658694917],
        rotation: [-3.018588990387631,0.9049896713718872,3.0446740459899666],
        CameraLookAt: [6725.389999878144,0,17733.396007951305],
        Up: "AugustIn",
        Left: "JulyWorld",
        Right: "SeptemberWorld",
        Down: "LookOut",
    }],
    ["AugustIn", {
        position: [-6725.710147084084,1.018633957339787,17734.538320003598], //z is radius
        rotation: [-0.23414070674131798,-0.03526475056215123,-0.00840924246344931],
        Up: "AugustWorld",
        Specific:
            {
                "AugustWorld": 5000,
            },
    }],
    ["SeptemberWorld", {
        position: [1782.8951259964942,2456.3693877596756,7430.758675364721],
        rotation: [-2.770233688399429,1.0297532004403638,2.819416561655845],
        CameraLookAt: [9482.934733315476,0,13738.4027643854],
        Up: "SeptemberIn",
        Left: "AugustWorld",
        Right: "OctoberWorld",
        Down: "LookOut",
    }],
    ["SeptemberIn", {
        position: [-9483.183416060187,1.1720444435391733,13739.905144679979], //z is radius
        rotation: [-0.2406150666569362,-0.016003888203148783,-0.003926665463000965],
        Up: "SeptemberWorld",
        Specific:
            {
                "SeptemberWorld": 5000,
            },
    }],
    ["OctoberWorld", {
        position: [-1900.3560399529697,-191.229083942502,10285.743198610575],
        rotation: [0.1390653704293587,1.4034730539027578,-0.13714762714219703],
        CameraLookAt: [10068.053401102463,0,8919.516988850504],
        Up: "OctoberIn",
        Left: "SeptemberWorld",
        Right: "NovemberWorld",
        Down: "LookOut",
    }],
    ["OctoberIn", {
        position: [-10068.246331518443,0.9454683983632204,8921.469856316104], //z is radius
        rotation: [-0.1285557913010959,-0.01961085854308632,-0.0025349022871482534],
        Up: "OctoberWorld",
        Specific:
            {
                "OctoberWorld": 5000,
            },
    }],
    ["NovemberWorld", {
        position: [-3758.8932826796945,-228.8876569454478,7896.530828508449],
        rotation: [0.06501003728917525,0.9158951344368814,-0.05158693710978471],
        CameraLookAt: [8346.70236789346,0,4380.687338652613],
        Up: "NovemberIn",
        Left: "OctoberWorld",
        Right: "DecemberWorld",
        Down: "LookOut",
    }],
    ["NovemberIn", {
        position: [-8346.946000968986,1.2518061069939599,4382.345268252465], //z is radius
        rotation: [-0.19115748545445557,-0.009706914540241926,-0.0018784543009503234],
        Up: "NovemberWorld",
        Specific:
            {
                "NovemberWorld": 5000,
            },
    }],
    ["DecemberWorld", {
        position: [-1903.5911752008815,570.5034932231418,8490.07552039814],
        rotation: [-0.07769191922976268,0.3650981040345988,0.027787987491343195],
        CameraLookAt: [4713.222410867884,0,1161.7049878251364],
        Up: "DecemberIn",
        Left: "NovemberWorld",
        Right: "StartWorldFromSpace",
        Down: "LookOut",
    }],
    ["DecemberIn", {
        position: [-4713.53891019706,1.2075466948510931,1163.2425000016858], //z is radius
        rotation: [-0.1583136562032504,-0.03905451624488307,-0.006233374936273578],
        Up: "DecemberWorld",
        Specific:
            {
                "DecemberWorld": 5000,
            },
    }],
    ["LookOut", {
        position: [0,10000,10000], //z is radius
        rotation: [0,0,0],
        Down: "",
    }],

]);

export {CameraValues};