import { useForm } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';

type ProsButtonDelete = {
    url: string;
    size?: number;
}

export function ButtonDelete({ url, size}: ProsButtonDelete) {
    const { delete: destroy, processing } = useForm();

    function handleDelete() {
        if (confirm('Tem certeza que deseja excluir?')) {
            destroy(url, {
                preserveScroll: true
            });
        };
    }

    return (
        <button
            onClick={handleDelete}
            disabled={processing}
            className="
                flex items-center gap-2
                bg-red-600 hover:bg-red-700 
                text-white font-medium 
                px-2 py-2 rounded-xl 
                transition-all
            "
            style={{
                padding: size ? `${size}px` : "",
            }}
        >
            <Trash2 size={size ? size : 12} />
        </button>
    );
}
