import icons from "../utils/icons";



const { MdOutlineEditNote,  MdOutlineFormatListBulleted, TbLogout} = icons;
export const Menu = [
    {
        path: '',
        text: 'List user',
        icons: <MdOutlineFormatListBulleted size={24}/>    
    },
    {
        path: '/update',
        text: 'Edit Profile',
        icons: <MdOutlineEditNote size={24}/>    
    }
]

export default Menu