import icons from "./icons"


const { MdOutlineEditNote,  MdOutlineFormatListBulleted, TbLogout} = icons;
export const sidebarMenu = [
    {
        path: '',
        text: 'List user',
        icons: <MdOutlineFormatListBulleted size={24}/>    
    },
    {
        path: '/update',
        text: 'Edit Profile',
        icons: <MdOutlineEditNote size={24}/>    
    },
    {
        path: '/login',
        text: 'Logout',
        icons: <TbLogout size={24}/>    
    }
]