import { HomeOutlined,MoneyCollectFilled, EditOutlined, QuestionCircleOutlined, QuestionOutlined, BookOutlined} from "@ant-design/icons";

export const LayoutDatas=[
    {
        id:1,
        path:"/dashboard/home",
        icon:HomeOutlined, 
        title:"Home"
    },
    {
        id:3,
        path:"/dashboard",
        icon:QuestionCircleOutlined,
        title:"Question",
        children:[{
            id:4,
            path:"/dashboard/question/create",
            icon:QuestionOutlined,
            title:"Question Create",
        },
        {
            id:5,
            path:"/dashboard/question/edit/:id",
            icon:EditOutlined ,
            title:"Quseton Edit",
        },
        {
            id:9,
            path:"/dashboard/question/get",
            icon:MoneyCollectFilled ,
            title:"Question get all",
        },
        {
            id:6,
            path:"/dashboard/question/get/:id",
            icon:MoneyCollectFilled ,
            title:"Qusetion get one",
        },
        ]
    },
    {
        id:2,
        path:"/dashboard/test",
        icon:BookOutlined, 
        title:"Apply Test"
    },

    
]