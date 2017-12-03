exports.getDefaultChannel = async (guild) => {
  // get "original" default channel
  if (guild.channel.has(guild.id)) { return guild.channels.get(guild.id) }

  // Check for a "fifa" channel, which is often default fifa chat
  if (guild.channels.exists('name', 'fifa')) { return guild.channels.find('name', 'fifa') }

  // Check for a "general" channel, which is often default chat
  if (guild.channels.exists('name', 'general')) { return guild.channels.find('name', 'general') }
  // Now we get into the heavy stuff: first channel in order where the bot can speak
  // hold on to your hats!
  return guild.channels
    .filter(c => c.type === 'text' && c.permissionsFor(guild.client.user).has('SEND_MESSAGES'))
    .sort((a, b) => a.position - b.position).first()
}
