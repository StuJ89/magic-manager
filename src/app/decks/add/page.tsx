import { AddDeckForm } from 'app/components/forms/add-deck';
import { FormPageLayout } from 'app/layouts/form-page';

export default function Page() {
    return (
        <FormPageLayout title='Add Deck'>
            <AddDeckForm />
        </FormPageLayout>
    );
}
