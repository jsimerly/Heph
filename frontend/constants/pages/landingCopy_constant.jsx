import {
    hilti,
    deWalt,
    makita,
    milwuakee,
    rugdoctor } from "../assets/images/logos";

import { yard, carpet, tools, saw, flooring } from "../assets/images/categories";

import EditIcon from '@mui/icons-material/Edit';
import LoopIcon from '@mui/icons-material/Loop';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';

export const heroMain = {
    title: 'Tools to Your Doorstep',
    desc: "Heph provides tools for rent to be dropped off and picked up at your home.",
    cta: "Shop Now"
}

export const howToInfo = {
    title: "4 Easy Steps",
    steps: [
        {
            title: "Tell Us Where",
            paragraph: "No need to leave, just let us know where to go.",
        },
        {
            title: "Tell Us When",
            paragraph: "A month long remodel or a weekend project? Take whatever time you need.",
        },
        {
            title: "Tell Us What",
            paragraph: "Need a saw, portable workbench, and a sander? We've got you covered.",
        },
        {
            title: "Build",
            paragraph: "Enjoy your hassle free project with all the tools you need.",
        }
    ]
}

export const categories = {
    title: 'Stop Putting Off Projects',
    cats: [
        {
            header: "No More Cutting Corners",
            desc : "Cutting corners is for saws. You won't ever have to sell your project short renting with us.",
            cta1: 'Shop Power Tools',
            nav:{name:'Power Tools', fe_id:'0200'},
            img: saw,
        },
        {
            header: "Craftsman's Choice",
            desc: "Pick and choose exactly which tools you need to make sure your DIY project is perfect.",
            cta1: 'Shop General Tools',
            nav:{name:'General Tools', fe_id:'0300'},
            img: tools,
        },        
        {
            header: "Prepare to be Floored",
            desc:"Experience the efficiency of top-tier flooring tools. Say farewell to challenging installations and hello to flawlessly laid floors.",
            cta1: 'Shop Carpet Cleaning',
            nav:{name:'Carpet Cleaners', fe_id:'0500'},
            img: flooring,
        },

    ]
}

export const quality = {
    title: <> 
                <span className="text-secondary"> 100% </span>Quality Guarantee
            </>,
    paragraph: <>
                We only work with the best products. If you are not satisfied with the quality, we will give you a full refund or replacement for  <span className="text-secondary font-bold"> Free. </span> 
                </>,
    logos: [
        hilti, deWalt, makita, milwuakee, rugdoctor
    ]
}

export const easy = {
    header: <>We <span className="text-primary"> Help </span> Make It Easy</>,
    cards : [
    {
        title: 'Update or Cancel an Order',
        desc: 'Make updates to where, when, and what you ordered',
        icon: <EditIcon/>,
        link: '/find-order'
    },
    {
        title: 'Exchange an Item',
        desc: "Change your mind? We'll swap it out",
        icon: <LoopIcon/>,
        link: '/find-order'
    },
    {
        title: 'Contact Support',
        desc: "Need a hand with anything? We're happy to help",
        icon: <HelpCenterIcon/>,
        link: '/contact-support'
    }
]}

export const socialProof = {
    header: "Don't Just Take Our Word for It",
    cards: [
        {
            name: 'Emily P.',
            location: 'Fishers',
            initials: 'EP',
            bg_color: '#A1DCED',
            pic: '',
            text: "Our family had been procrastinating on getting some renovations done. When using Heph, it forced us to actually complete our projects instead of waiting months like with previous projects. Our renovations actually turned out way better because we were using professional equipment this time as well!"
        },
        {
            name: 'Anthony G.',
            location: 'Noblesville',
            initials: 'AG',
            bg_color: '#C5A8F7',
            pic: '',
            text: "Since I started working from home, I've gotten really into DIY projects but could afford all of the equipment for everything I wanted to do. These guys made it easy without breaking the bank to build everything I want to."
        },
        {
            name: 'Jacob S.',
            location: 'Fishers',
            initials: 'JS',
            bg_color: '#E9EDC0',
            pic: '',
            text: "I was finally able to clean my carpets at a reasonable price. I always felt like I was getting ripped off paying $400+ dollars just because I don't own a professional carpet cleaner.",            
        },
        {
            name: 'Marcus T.',
            location: 'Carmel',
            initials: 'MT',
            bg_color: '#E1B0B6',
            pic: '',
            text: "This was my first year aerating my yard. I'd never had the option before because I didn't have anything to aerate with. The yard looks great, I'll be doing this every year from now on out."
        }
    ]
}