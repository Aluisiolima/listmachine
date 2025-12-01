import InputError from "@/components/input-error";
import AuthLayout from "@/layouts/auth-layout";
import { Form, Head } from '@inertiajs/react';
import { store } from "@/routes/maintenance"; 
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

type Props = {
    computer_id: number;
    user_id: number;
    computer_nome: string;
};

export default function MaintenanceCreate({ computer_id, user_id, computer_nome }: Props) {
    return (
        <AuthLayout
            title="Agendar Revisão"
            description={`Agendando revisão para o computador ${computer_nome}`}
        >
            <Head title="Criando Revisão" />

            <Form
                {...store.form()}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">

                            {/* Campos ocultos */}
                            <input type="hidden" name="computer_id" value={computer_id} />
                            <input type="hidden" name="user_id" value={user_id} />

                            {/* Tipo */}
                            <div className="grid gap-2">
                                <Label htmlFor="tipo">Tipo</Label>
                                <Input
                                    id="tipo"
                                    type="text"
                                    required
                                    name="tipo"
                                    placeholder="Ex: Manutenção preventiva, Limpeza, Revisão geral..."
                                />
                                <InputError message={errors.tipo} />
                            </div>

                            {/* Descrição */}
                            <div className="grid gap-2">
                                <Label htmlFor="descricao">Descrição</Label>
                                <Input
                                    id="descricao"
                                    type="text"
                                    required
                                    name="descricao"
                                    placeholder="Descreva o que será feito na revisão"
                                />
                                <InputError message={errors.descricao} />
                            </div>

                            {/* Próxima Revisão */}
                            <div className="grid gap-2">
                                <Label htmlFor="proxima_revisao">Próxima Revisão</Label>
                                <Input
                                    id="proxima_revisao"
                                    type="date"
                                    required
                                    name="proxima_revisao"
                                />
                                <InputError message={errors.proxima_revisao} />
                            </div>

                            {/* Botão */}
                            <Button
                                type="submit"
                                className="mt-2 w-full"
                                tabIndex={10}
                            >
                                {processing && <Spinner />}
                                Salva Manutenção
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
