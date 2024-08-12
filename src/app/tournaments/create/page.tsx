import { AddTournamentForm } from 'app/components/forms/add-tournament';
import { FormPageLayout } from 'app/layouts/form-page';

export default function Page() {
    return (
        <FormPageLayout title='Create Tournament'>
            <AddTournamentForm />
        </FormPageLayout>
    );
}
