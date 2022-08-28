import type { TFormData, TSearchPayload } from '../Domain';

export const toReadableFormFormat = (rawForm: TSearchPayload): TFormData => {
  const { iul_name, oksm_id, iul_id, iul_address, iul_employee } = rawForm || {};
  const form: TFormData = { name: iul_name };

  if (iul_address) { form.address = iul_address; }
  if (iul_id) { form.id = iul_id; }
  if (iul_employee) { form.boss = iul_employee; }
  if (oksm_id) { form.country = oksm_id; }

  return form;
};
