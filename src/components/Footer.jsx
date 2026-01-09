import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="py-10 text-center border-t border-white/10">
      <div className="flex justify-center gap-6 text-2xl text-gray-400">
        <a href="
https://linkedin.com/in/pratik-bothra-0b98b538a" target="_blank" className="hover:text-blue-500">
          <FaLinkedin />
        </a>
        <a href="
https://github.com/pratick29" target="_blank" className="hover:text-white">
          <FaGithub />
        </a>
        <a href="https://leetcode.com/u/pratick29" target="_blank" className="hover:text-yellow-400">
          <SiLeetcode />
        </a>
        <a href="
https://x.com/pratickbothra" target="_blank" className="hover:text-sky-400">
          <FaXTwitter />
        </a>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Pratik Bothra
      </p>
    </footer>
  );
}
