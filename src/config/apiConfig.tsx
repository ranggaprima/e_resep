const config = {
  protocol: import.meta.env.PROTOCOL || 'http',
  ipServer: import.meta.env.HOSTNAME || '116.193.190.138',
  port: import.meta.env.PORT || '9000',
};

console.log('CONFIG:', config.protocol)

export const apiConfig = (path: any) => `${config.protocol}://${config.ipServer}:${config.port}/api/${path}`;
console.log('apiConfig: ', apiConfig)

export default apiConfig;
