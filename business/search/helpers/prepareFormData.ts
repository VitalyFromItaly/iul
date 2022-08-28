import type { TFormData, TSearchPayload } from '../Domain';

export const prepareFormData = (formData: TFormData): TSearchPayload => {
  const { boss, address, name, id, country } = formData || {};

  const payload: TSearchPayload = { iul_name: name };

  if (address) { payload.iul_address = address; }
  if (id) { payload.iul_id = id; }
  if (boss) { payload.iul_employee = boss; }
  if (country) { payload.oksm_id = country; }

  return payload;
};
