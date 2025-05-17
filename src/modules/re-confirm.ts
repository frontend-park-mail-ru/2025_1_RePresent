'use strict';

import { Confirm, ConfirmProps } from '../components/confirm/confirm';

export async function reConfirm(props: ConfirmProps): Promise<boolean> {
    const confirmPopup = new Confirm(document.body);
    confirmPopup.render(props);
    return confirmPopup.confirm();
}
