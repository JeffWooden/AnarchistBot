# Anarchist Bot
Discord doesn't provide any functionnality to create a server based on a **horizontal hierarchy**.
By that, this bot aims at giving this opportunity to whoever wants to build such server. The **temporary admin** configure the bot and **throw their permission** to let people vote and organized the server.

# How To Install
## Invite the bot
undefined
## Create your own
undefined

# How To Configure
As the bot can be used for many reasons, there is a configurable file in which all available settings are noted. You can edit them in many ways.
## By command on Discord
If you're an admin, type the `<prefix>config` command.
You'll get all the details needed to modify the config and all its settings.
## By editing the server file
Go to the Bot folder, then follow the tree structure as follows:
```
handler / configs / <your server ID> / config.json
```
Most of the settings are booleans, but some need channel-names (or channel-ids): be aware !
## Config Variables
```
📄 config.json
└ prefix {string} - Prefix utilisé pour les commandes
└ vote
	└ major: {int} - Temps de vote alloué pour un référendum majeur
	└ minor: {int} - Temps de vote alloué pour un référendum mineur
	└ channel: {int|string} - Salon dédié aux votes (si non renseigné, le vote s'effectuera dans le salon de la commande)
	└ delegate_ony: {boolean} - Si activé, seul les délégués pourront ouvrir des votes
└ timeout - Temps de disparition des messages du bot
	└ errors: {int}
	└ command_execution: {int}
```

Important: this READ-ME is outdated. Wait before the whole system is explained before considering inviting the bot in your server.
