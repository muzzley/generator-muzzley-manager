exports = module.exports = {
  getCredentialsKey: function (muzzleyId, providerId) {
    return '{{ lname }}:credentials:' + muzzleyId + ':' + providerId;
  },
  getSubscriptionKey: function (muzzleyId, deviceId) {
    return '{{ lname }}:subscriptions:' + muzzleyId + ':' + deviceId;
  },
  getChannelKey: function (muzzleyId) {
    return '{{ lname }}:channels:' + muzzleyId;
  }
};
