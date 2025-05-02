import { Facebook, Instagram, Youtube, Linkedin, MessageCircle, Send } from "lucide-react"

export function Footer() {
  const socialLinks = [
    { icon: <Facebook size={18} />, url: "https://web.facebook.com/yaxsarhane", label: "Facebook" },
    { icon: <Instagram size={18} />, url: "https://instagram.com/yaxsarhane", label: "Instagram" },
    { icon: <Youtube size={18} />, url: "https://www.youtube.com/@yaxsarhane", label: "YouTube" },
    { icon: <Linkedin size={18} />, url: "https://ma.linkedin.com/in/yaxsarhane", label: "LinkedIn" },
    {
      icon: <MessageCircle size={18} />,
      url: "https://api.whatsapp.com/send?phone=212774079856&text=Hello!",
      label: "WhatsApp",
    },
    { icon: <Send size={18} />, url: "https://t.me/yaxsarhane", label: "Telegram" },
  ]

  return (
    <footer className="w-full py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-white/70">
              Created with <span className="text-pink-500">♥</span> by
            </p>
            <p className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              SARHANE Yassir
            </p>
            <p className="text-xs text-white/50 mt-1 mb-4">Graphic Designer & Front-End Developer</p>

            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
