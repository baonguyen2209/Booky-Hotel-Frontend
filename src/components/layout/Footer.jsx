import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const socials = [
    {
        icon: <FaYoutube />,
        href: '#',
    },
    {
        icon: <FaFacebook />,
        href: '#',
    },
    {
        icon: <FaInstagram />,
        href: '#',
    },
    {
        icon: <FaTwitter />,
        href: '#',
    },
]

export default function Footer() {
  return (
    <footer className="bg-primary py-[60px] lg:py-[120px]">
        <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
                {/* logo */}
                <Link to={"/"}>
                <img src="/logo-white.svg" alt="" width={160} height={160}/>
                </Link>
                <div className="flex gap-4">
                    {socials.map((item, index) => {
                        return (
                            <a 
                                href={item.href} 
                                key={index}
                                className="bg-accent hover:bg-accent-hover text-white text-lg w-[38px] h-[38px] flex items-center justify-center rounded-full transition-all"
                            >
                                {item.icon}
                            </a>
                        )
                    })}
                </div>
            </div>
        </div>
    </footer>
  )
}
