import InputError from "@/components/input-error";
import AuthLayout from "@/layouts/auth-layout";
import { Form, Head } from '@inertiajs/react';
import { store } from "@/routes/software"; 
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

type Props = {
    computer_id: number;
    computer_nome: string;
};

export default function SoftwareCreate({ computer_id, computer_nome }: Props) {
    return (
        <AuthLayout
            title="Registrar Software"
            description={`Registrando software no computador ${computer_nome}`}
        >
            <Head title="Novo Software" />

            <Form
                {...store.form()}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">

                            {/* Campo oculto */}
                            <input type="hidden" name="computer_id" value={computer_id} />

                            {/* Nome */}
                            <div className="grid gap-2">
                                <Label htmlFor="nome">Nome</Label>
                                <Input
                                    id="nome"
                                    type="text"
                                    required
                                    name="nome"
                                    placeholder="Ex: Word 2022, Excel 2022, Chrome..."
                                />
                                <InputError message={errors.nome} />
                            </div>

                            {/* Observações */}
                            <div className="grid gap-2">
                                <Label htmlFor="observacoes">Observações</Label>
                                <Input
                                    id="observacoes"
                                    type="text"
                                    required
                                    name="observacoes"
                                    placeholder="Informações adicionais, versão instalada, etc."
                                />
                                <InputError message={errors.observacoes} />
                            </div>

                            {/* Botão */}
                            <Button
                                type="submit"
                                className="mt-2 w-full"
                                tabIndex={10}
                            >
                                {processing && <Spinner />}
                                Salvar Software
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
