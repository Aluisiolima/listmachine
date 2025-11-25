import InputError from "@/components/input-error";
import AuthLayout from "@/layouts/auth-layout";
import { Form, Head, router } from '@inertiajs/react';
import { store } from "@/routes/computer";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

type ProsComputer = {
    locais: {id: number, nome: string}[];
};

export default function Computer({ locais } : ProsComputer) {
    return (
            <AuthLayout
                title="Cadrastando Novo Computador"
                description="Adicione as informacoes do Computador"
            >
                <Head title="Criando Computador" />
                <Form
                    {...store.form()}
                    disableWhileProcessing

                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="nome">Nome</Label>
                                    <Input
                                        id="nome"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="nome"
                                        name="nome"
                                        placeholder="Digite o nome da Maquina"
                                    />
                                    <InputError
                                        message={errors.nome}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="processador">Qual o Processador?</Label>
                                    <Input
                                        id="processador"
                                        type="text"
                                        required
                                        tabIndex={2}
                                        autoComplete="on"
                                        name="processador"
                                    />
                                    <InputError message={errors.processador} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="memoria_ram_gb">Quanto de memoria ram (GB)?</Label>
                                    <Input
                                        id="memoria_ram_gb"
                                        type="number"
                                        required
                                        tabIndex={3}
                                        autoComplete="on"
                                        name="memoria_ram_gb"
                                        placeholder="Ex: 8"
                                    />
                                    <InputError message={errors.memoria_ram_gb} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="armazenamento_gb">
                                        Quanto de Armazenamento Interno (GB)?
                                    </Label>
                                    <Input
                                        id="armazenamento_gb"
                                        type="number"
                                        required
                                        tabIndex={4}
                                        autoComplete="on"
                                        name="armazenamento_gb"
                                        placeholder="Ex: 256"
                                    />
                                    <InputError
                                        message={errors.armazenamento_gb}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="sistema_operacional">
                                        Qual o Sistema Operacional da Maquina?
                                    </Label>
                                    <Input
                                        id="sistema_operacional"
                                        type="text"
                                        required
                                        tabIndex={4}
                                        autoComplete="on"
                                        name="sistema_operacional"
                                        placeholder="Ex: Windows 10"
                                    />
                                    <InputError
                                        message={errors.sistema_operacional}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="locations_id">
                                        De onde e essa Maquina?
                                    </Label>
                                    <select
                                        id="locations_id"
                                        name="locations_id"
                                        required
                                        className="border rounded p-2 h-11"
                                        defaultValue=""
                                    >
                                        <option value="">Selecione...</option>

                                        {locais.map(local => (
                                            <option key={local.id} value={local.id}>
                                                {local.nome}
                                            </option>
                                        ))}
                                    </select>

                                    <InputError message={errors.localizacao_id} />
                                </div>


                                <div className="grid gap-2">
                                    <Label htmlFor="status">
                                        Qual o Status da Maquina?
                                    </Label>
                                    <Input
                                        id="status"
                                        type="text"
                                        required
                                        tabIndex={4}
                                        autoComplete="on"
                                        name="status"
                                        placeholder="Ex: Funcionando mais ruim"
                                    />
                                    <InputError
                                        message={errors.status}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="mt-2 w-full"
                                    tabIndex={5}
                                    data-test="register-user-button"
                                >
                                    {processing && <Spinner />}
                                    Create account
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </AuthLayout>
    );
}
