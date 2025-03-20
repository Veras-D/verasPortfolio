import discord
from discord import app_commands
from discord.ext import commands
import random
import aiohttp
import asyncio
import os

# Server ID
# server_id = 1297025075694010433
server_id = 1291774064603435192  # Mina Server


# Giphy API
GIPHY_API_KEY = os.getenv("GIPHY_API_KEY")
BASE_URL = "https://api.giphy.com/v1/gifs/random"

# Bot creation
intents = discord.Intents.default()
intents.members = True
bot = commands.Bot(command_prefix="!", intents=intents)
tree = bot.tree

# Function to fetch GIFs from Giphy
async def get_gif(tag):
    async with aiohttp.ClientSession() as session:
        async with session.get(
            f"{BASE_URL}?api_key={GIPHY_API_KEY}&tag={tag}&rating=pg-13"
        ) as response:
            if response.status == 200:
                data = await response.json()
                return data["data"]["images"]["original"]["url"]
            return None

@bot.event
async def on_ready():
    await tree.sync(guild=discord.Object(id=server_id))
    print(f"My name is {bot.user}")

# Welcome event
@bot.event
async def on_member_join(member):
    welcome_channel = discord.utils.get(member.guild.text_channels, name="general")  # Change to your desired channel
    rules = discord.utils.get(member.guild.text_channels, name="RULES")  # Change to your desired channel
    description = f"Hello {member.mention}! Welcome to WastedServices.\nPlease read the rules here: {rules.mention}"
    embed = discord.Embed(
        title="Welcome to the Server!",
        description=description,
        color=0x00ff00,
    )
    if welcome_channel:
        await welcome_channel.send(embed=embed)

# Command to send GIFs
@tree.command(guild=discord.Object(id=server_id), name='fail', description="Sends a funny 'fail' GIF")
async def fail(interaction: discord.Interaction):
    gif_url = await get_gif("fail")
    if gif_url:
        await interaction.response.send_message(gif_url)
    else:
        await interaction.response.send_message("I couldn't find a GIF right now.")

@tree.command(guild=discord.Object(id=server_id), name='cat', description="Sends a funny 'cat' GIF")
async def cat(interaction: discord.Interaction):
    gif_url = await get_gif("cat")
    if gif_url:
        await interaction.response.send_message(gif_url)
    else:
        await interaction.response.send_message("I couldn't find a GIF right now.")

# rolls command
@tree.command(guild=discord.Object(id=server_id), name="roll", description="Roll a dice")
async def roll(interaction: discord.Interaction):
    class DiceRollerView(discord.ui.View):
        def __init__(self):
            super().__init__(timeout=180.0)  # 3 minutes timeout
            
        async def roll_dice(self, interaction: discord.Interaction, dice_type: str):
            dice_max = int(dice_type[1:])
            roll_result = random.randint(1, dice_max)

            embed = discord.Embed(
                title=f"🎲 *{interaction.user.global_name}* rolled a {dice_type}!",
                description=f"**Result**: `{roll_result}`",
                color=discord.Color.purple()
            )
            embed.set_footer(text="Good luck on your next roll!")
            
            await interaction.response.send_message(embed=embed)

        @discord.ui.button(label="Roll D20", style=discord.ButtonStyle.green)
        async def roll_d20(self, interaction: discord.Interaction, button: discord.ui.Button):
            await self.roll_dice(interaction, "D20")

        @discord.ui.button(label="Roll D10", style=discord.ButtonStyle.blurple)
        async def roll_d10(self, interaction: discord.Interaction, button: discord.ui.Button):
            await self.roll_dice(interaction, "D10")

        @discord.ui.button(label="Roll D8", style=discord.ButtonStyle.primary)
        async def roll_d8(self, interaction: discord.Interaction, button: discord.ui.Button):
            await self.roll_dice(interaction, "D8")

        @discord.ui.button(label="Roll D6", style=discord.ButtonStyle.secondary)
        async def roll_d6(self, interaction: discord.Interaction, button: discord.ui.Button):
            await self.roll_dice(interaction, "D6")

    await interaction.response.send_message("Select a dice to roll:", view=DiceRollerView())


# Command to create a temporary voice channel
@tree.command(guild=discord.Object(id=server_id), name='create_temp_voice_channel', description="Creates a temporary voice channel")
async def create_temp_channel(interaction: discord.Interaction, channel_name: str = "Temporary Channel"):
    if interaction.user != interaction.guild.owner:
        await interaction.response.send_message("Only the server owner can use this command.", ephemeral=True)
        return

    temp_channel = await interaction.guild.create_voice_channel(name=channel_name)
    await interaction.response.send_message(f"Voice channel '{channel_name}' created! It will be deleted in 10 minutes if no one is in it.", ephemeral=True)

    await asyncio.sleep(600)

    if temp_channel and len(temp_channel.members) == 0:
        await temp_channel.delete()
        await interaction.response.send_message(f"The channel '{channel_name}' has been deleted.", ephemeral=True)

# Command to create a temporary text channel
@tree.command(guild=discord.Object(id=server_id), name='create_temp_text_channel', description="Creates a temporary text channel")
async def create_temp_text_channel(interaction: discord.Interaction, channel_name: str = "Temporary Text Channel"):
    if interaction.user != interaction.guild.owner:
        await interaction.response.send_message("Only the server owner can use this command.", ephemeral=True)
        return

    temp_channel = await interaction.guild.create_text_channel(name=channel_name)
    await interaction.response.send_message(f"Text channel '{channel_name}' created! It will be deleted in 10 minutes if there are no messages.", ephemeral=True)

    def check_message_in_channel(message):
        return message.channel == temp_channel

    try:
        await bot.wait_for("message", check=check_message_in_channel, timeout=600)
    except asyncio.TimeoutError:
        if temp_channel:
            await temp_channel.delete()
            await interaction.response.send_message(f"The text channel '{channel_name}' has been deleted due to inactivity.", ephemeral=True)

TOKEN = os.getenv("DISCORD_BOT_TOKEN")
bot.run(TOKEN)
