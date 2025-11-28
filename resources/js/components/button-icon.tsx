type ProsButtonIcon = {
    href: string;
    Icon: any;
    isAbsolute?: boolean;
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    size?: number;
}
export default function ButtonIcon({ 
    href, 
    Icon, 
    isAbsolute, 
    bottom, 
    left, 
    right, 
    top,
    size
}: ProsButtonIcon) {
    return (
        <a
            href={href}
            className="
                fixed bottom-6 right-6
                bg-green-600 text-white
                p-6 rounded-full
                shadow-xl z-11
                hover:bg-green-700 transition
                flex items-center justify-center
            "
            style={{
                position: isAbsolute ? 'absolute' : 'fixed',
                top: isAbsolute ? `${top}px` : '',
                bottom: isAbsolute ? `${bottom}px` : '',
                left: isAbsolute ? `${left}px` : '',
                right: isAbsolute ? `${right}px` : '',
                padding: isAbsolute ? `${2}px` : '',
                width: isAbsolute ? `${size}px` : '',
                height: isAbsolute ? `${size}px` : ''
            }}
        >
            <Icon className="w-6 h-6" 
                style={{
                    width: isAbsolute ? `${size}px` : '',
                    height: isAbsolute ? `${size}px` : ''
                }}
            />
        </a>
    );
}
