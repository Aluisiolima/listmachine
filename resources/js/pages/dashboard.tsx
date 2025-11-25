import ButtonIcon from '@/components/button-icon';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react'
import { ComputerCard } from './computer/computer-card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

type ProsDashboard = {
    isAdmin : boolean
    computers: []
    component: string
}

export default function Dashboard({ isAdmin, computers, component} : ProsDashboard) {
    const components: Record<string, React.ReactNode> = {
        "computer-card": <ComputerCard isAdmin={isAdmin} computers={computers} childComponent={<ButtonIcon Icon={Plus} href='/computer'></ButtonIcon>}/>,
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            {components[component]}
        </AppLayout>
    );
}
