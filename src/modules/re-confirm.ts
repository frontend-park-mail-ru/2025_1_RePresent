'use strict';

import { Confirm, ConfirmProps } from '../components/confirm/confirm';

const root = document.getElementById('root') as HTMLElement;

export async function reConfirm(props: ConfirmProps): Promise<boolean> {
    const confirmPopup = new Confirm(root);
    confirmPopup.render(props);
    return confirmPopup.confirm();
}
