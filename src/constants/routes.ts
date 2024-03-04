export const routes = {
  clients: '/clients',
  client: (id?: string) => (id ? `/client/${id}` : '/client/:id'),
  stats: '/stats',
};
