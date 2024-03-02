export const routes = {
  clients: '/clients',
  stats: '/stats',
  client: (id?: string) => (id ? `/client/${id}` : '/client/:id'),
};
