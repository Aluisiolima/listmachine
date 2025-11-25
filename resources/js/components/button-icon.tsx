type ProsButtonIcon = {
    href: string;
    Icon: any
}
export default function ButtonIcon({ href, Icon }: ProsButtonIcon) {
    return (
        <a
            href={href}
            className="
                fixed bottom-6 right-6
                bg-green-600 text-white
                p-6 rounded-full
                shadow-xl
                hover:bg-green-700 transition
                flex items-center justify-center
            "
        >
            <Icon className="w-6 h-6" />
        </a>
    );
}
