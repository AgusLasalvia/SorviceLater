import pymysql
from discord.ext import commands

connection = pymysql.connect(
    host='ec2-44-209-24-62.compute-1.amazonaws.com',
    user='gnoellfbbbujkx',
    passwd='0fd585265a9e50e6a4965f9af22d5f18c49cf32dbda5ff0c29d437060cd4cd2d',
    db='da1eroecl12e1b',
    port=5432
)
cursor = connection.cursor()

client = commands.Bot(command_prefix = '!')

@client.event
async def on_message(message):
    ticket_id = str(message.content)
    print(ticket_id)
    cursor.execute(
         f'SELECT status,additional_comments FROM Ticket WHERE id = "{ticket_id}";')
    status = cursor.fetchone()
    await message.author.send(f"Status: {status[0]}\n additional comments: {status[1]}")

client.run('OTg2MTEwODY3MzY2MTE3Mzc4.G2eImO.C7A922zDyC0iVKH12olQjmBxyb1Lb198dJl5LU')