import { FormPageLayout } from 'app/layouts/form-page';
import { AddCardForm } from 'app/components/forms/add-card';

export default function Page() {
    return (
        <FormPageLayout title='Add Card'>
            <AddCardForm />
        </FormPageLayout>
    );
}
