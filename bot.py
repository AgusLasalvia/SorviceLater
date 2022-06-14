
from config import token
import discord
from discord.ui import Button, View
from discord.ext import commands


bot = commands.Bot(command_prefix="!")


@bot.command()
async def report(ctx):
    lost_item = Button(label="Perdida de item",
                       style=discord.ButtonStyle.green)
    hacker = Button(label="Hacker", style=discord.ButtonStyle.danger)
    bug = Button(label="Bug", style=discord.ButtonStyle.blurple)
    #button_4 = Button(label="Click me", style=discord.ButtonStyle.green)
    view = View()
    view.add_item(lost_item)
    view.add_item(hacker)
    view.add_item(bug)
    await ctx.send("hi", view=view)

# @client.event
# async def on_message(message):
#     username = str(message.author).split('#')[0]
#     user_message = str(message.content)
#     if message.channel.name == 'servicelater':
#         if user_message.lower() == ''
bot.run(token)
