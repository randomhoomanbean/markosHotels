const Discord = require('discord.js');
const client = new Discord.Client();
const Roblox = require('noblox.js')
const {Client, MessageEmbed} = require('discord.js');

let warns = new Map();

client.on('message', async msg=>{
  if(msg.content === '.help' || msg.content==='!help' || msg.content === '.cmds' || msg.content==='!cmds' || msg.content === '.commands' || msg.content==='!commands'){

    const helptext = require('fs');
    const helpscreen = new MessageEmbed();
    helpscreen.setTitle("Commands");
    helpscreen.setColor("3398FF");

    if(msg.member.hasPermission("ADMINISTRATOR")){
      helpscreen.setDescription(helptext.readFileSync("Command Help Mod.txt", "utf-8"));
    }else{
      helpscreen.setDescription(helptext.readFileSync("Command Help.txt", "utf-8"));
    }
    msg.author.send(helpscreen);
    const displayhelp = new MessageEmbed();
    displayhelp.setTitle("Message Sent!");
    displayhelp.setColor("3398FF");
    displayhelp.setDescription("A list of commands has been sent to your DMs. Please contact the administration team if that is not the case.");
    msg.reply(displayhelp);
  }
  if(msg.content === '.verify' || msg.content==='!verify'){
    const displayhelp = new MessageEmbed();
    displayhelp.setTitle("Message Sent!");
    displayhelp.setColor("3398FF");
    displayhelp.setDescription("Instructions detailing the verification process has been sent to your DMs. Please contact the administration team if that is not the case.");
    msg.reply(displayhelp);
    verificationfunc(msg);

  }
  if(msg.toString().startsWith(".kick") || msg.toString().startsWith("!kick")){
    if(!msg.member.hasPermission('KICK_MEMBERS')){
      const displaykick = new MessageEmbed();
      displaykick.setTitle("Kick Command");
      displaykick.setColor("3398FF");
      displaykick.setDescription("You do not have permissions to kick.");
      msg.reply(displaykick);
      return;
    }
    try{
      msg.mentions.members.first().kick();
      const displaykick = new MessageEmbed();
      displaykick.setTitle("Member Kicked");
      displaykick.setColor("3398FF");
      displaykick.setDescription(msg.mentions.members.first().toString() + " has been kicked.");
      msg.channel.send(displaykick);
    }catch (err){
      const displaykick = new MessageEmbed();
      displaykick.setTitle("Error!");
      displaykick.setColor("3398FF");
      displaykick.setDescription("There was an error kicking this member. Please ensure both you and the bot have the proper permissions and the mentioned user is kickable.");
      msg.reply(displaykick)
    }
  }
  if(msg.toString().startsWith(".ban") || msg.toString().startsWith("!ban")){
    if(!msg.member.hasPermission('BAN_MEMBERS')){
      const displayban = new MessageEmbed();
      displayban.setTitle("Ban Command!");
      displayban.setColor("3398FF");
      displayban.setDescription("You do not have permissions to ban.");
      msg.reply(displayban);
      return;
    }
    try{
      msg.mentions.members.first().ban();
      const displayban = new MessageEmbed();
      displayban.setTitle("User Banned");
      displayban.setColor("3398FF");
      displayban.setDescription(msg.mentions.members.first().toString() + " has been banned.");
      msg.channel.send(displayban);
    }catch (err){
      const displayban = new MessageEmbed();
      displayban.setTitle("Error!");
      displayban.setColor("3398FF");
      displayban.setDescription("There was an error banning this member. Please ensure both you and the bot have the proper permissions and the mentioned user is bannable.");
      msg.reply(displayban)
    }
  }
   
   if(msg.toString().startsWith(".unban") || msg.toString().startsWith("!unban")){
    if(!msg.member.hasPermission('BAN_MEMBERS')){
      const displayuban = new MessageEmbed();
      displayuban.setTitle("Unban Command!");
      displayuban.setColor("3398FF");
      displayuban.setDescription("You do not have permissions to unban.");
      msg.reply(displayuban);
      return;
    }
    try{
      var unbanUser = "";
       
      if(msg.toString().startsWith("!")){
         unbanUser = msg.content.toString().split("!unban ")[1];
      }else{
         unbanUser = msg.content.toString().split(".unban ")[1];
      }
      
      msg.guild.members.unban(unbanUser);
      const displayban = new MessageEmbed();
      displayban.setTitle("User Unbanned");
      displayban.setColor("3398FF");
      displayban.setDescription("User with ID " + unbanUser.toString() + " has been unbanned.");
      msg.channel.send(displayban);
    }catch (err){
      console.log(err);
      const displayban = new MessageEmbed();
      displayban.setTitle("Error!");
      displayban.setColor("3398FF");
      displayban.setDescription("There was an error unbanning this member. Please ensure both you and the bot have the proper permissions and the mentioned user is unbannable.");
      msg.reply(displayban)
    }
  }
   
   
  
  if(msg.toString().startsWith(".warn") || msg.toString().startsWith("!warn")){
    //console.log(msg.member.hasPermission("ADMINISTRATOR"));
    if(!msg.member.hasPermission("ADMINISTRATOR")){
      const displaywarn = new MessageEmbed();
      displaywarn.setTitle("Warn Command");
      displaywarn.setColor("3398FF");
      displaywarn.setDescription("You do not have permissions to warn.");
      msg.reply(displaywarn);
      return;
    }else{
    let reason = msg.toString().split(" ");
    //console.log(reason);
    try{
      //Get reason
      var displayreason = "";
      var dr = 0;
        for (i=2;i < reason.length; i++){
          if (reason[i]!=' '){
            displayreason+=reason[i] + " ";
            dr++;
          }
        }
      

      //perp id
      var pid = msg.mentions.members.first();
      if (dr>=1){
        displayreason = displayreason.substr(0, displayreason.length-1);

        var warnn = "1";
        if(typeof warns.get(pid.id)!='undefined'){
          warnn=(warns.get(pid.id)[0]+1).toString();
        }

        const displaywarn = new MessageEmbed();
        displaywarn.setTitle("User Warned");
        displaywarn.setColor("3398FF");
        displaywarn.setDescription("You have been warned by " + msg.author.username + " in Marko's Hotels for ''" + displayreason +"'. This is your #"+ warnn +" warn; Please follow the server's rules.");
        pid.send(displaywarn);
      }else{
        //console.log("f");
        //console.log(msg.mentions.members.first().get("Guild").get("id"));
        var warnn = "1";
        if(typeof warns.get(pid.id)!='undefined'){
          warnn=(warns.get(pid.id)[0]+1).toString();
        }

        const displaywarn = new MessageEmbed();
        displaywarn.setTitle("User Warned");
        displaywarn.setColor("3398FF");
        displaywarn.setDescription("You have been warned by " + msg.author.username + " in Marko's Hotels. This is your #" + warnn + "  warn; Please follow the server's rules.");
        pid.send(displaywarn);
        displayreason = "No reason provided.";
      }

      //Set up in warns
      console.log(warns);
      if(typeof warns.get(pid.id) == 'undefined'){
        console.log("e");
        warns.set(pid.id, [1, displayreason, msg.author.username]);
      }else{
        warns.set(pid.id, [warns.get(pid.id)[0]+1, warns.get(pid.id)[1]+ "¶" + displayreason, warns.get(pid.id)[2] + "¶" + msg.author.username]);
      }
      console.log(warns);

      console.log("at embed");
        const displaywarn = new MessageEmbed();
        displaywarn.setTitle("User Warned");
        displaywarn.setColor("3398FF");
        displaywarn.setDescription(pid.toString() + " has been warned.");
        msg.channel.send(displaywarn);
        const fs = require('fs');
        fs.writeFile("map.txt", warns.toString(), function (err) {
         if (err) return console.log(err);
         console.log('Appended!');
        });

      //punishments
      if(warns.get(pid.id)[0]==3){
        try{
          pid.kick();
          msg.reply("This was " + pid.toString() + "'s third warn. They have now been kicked.");
        }catch{
          msg.reply("This was " + pid.toString() + "'s third warn. However, there was a problem kicking this user. Please ensure this bot has the correct permissions.");
        }
      }else if(warns.get(pid.id)[0]==6){
        try{
          pid.ban({
            days: 7
          });
          msg.reply("This was " + pid.toString() + "'s sixth warn. They have now been temporaily banned for the next week.");
        }catch{
          msg.reply("This was " + pid.toString() + "'s sixth warn. However, there was a problem banning this user. Please ensure this bot has the correct permissions.");
        }
      }else if(warns.get(pid.id)[0]==9){
        try{
          pid.ban();
          msg.reply("This was " + pid.toString() + "'s ninth warn. They have now been permenately banned from this server.");
        }catch{
          msg.reply("This was " + pid.toString() + "'s ninth warn. However, there was a problem banning this user. Please ensure this bot has the correct permissions.");
        }
      }
    }catch (err){
      console.log(err);
      const displayerr = new MessageEmbed();
      displayerr.setTitle("Error!");
      displayerr.setColor("3398FF");
      displayerr.setDescription("There was an error warning this member. Please ensure both you and the bot have the proper permissions.");
      msg.reply(displayerr);
    }
    }
  } 
  if(msg.toString().startsWith(".wrngs") || msg.toString().startsWith("!wrngs")){
    if(!msg.member.hasPermission("ADMINISTRATOR")){
      const displaywarn = new MessageEmbed();
      displaywarn.setTitle("Warnings Command");
      displaywarn.setColor("3398FF");
      displaywarn.setDescription("You do not have permissions to see past warnings.");
      msg.reply(displaywarn);
      return;
    }else{
      var warningsS = "";
      var pid = msg.mentions.members.first();

      if (typeof warns.get(pid.id) == 'undefined'){
        console.log("e");
        warningsS = "This user has no warnings.";
      }else{
        var rns = warns.get(pid.id)[1].split("¶");
        var wrns = warns.get(pid.id)[2].split("¶");
        for(let i=0; i<warns.get(pid.id)[0]; i++){
          warningsS+="Warning #" + (i+1).toString() + " - " + "Reason: '" + rns[i] + "' by " + wrns[i] + ".\n";
        }
      }
      console.log(pid.user.username);
      var warnDis = new MessageEmbed();
      warnDis.setTitle("Warnings for '" + pid.user.username+"'");
      warnDis.setColor("3398FF");
      warnDis.setDescription(warningsS);
      msg.channel.send(warnDis);
    }
  }
   
   
  if(msg.toString().startsWith(".mute") || msg.toString().startsWith("!mute")){
    
    if(!msg.member.hasPermission('MANAGE_ROLES')){
      const displaymute = new MessageEmbed();
      displaymute.setTitle("Mute Command");
      displaymute.setColor("3398FF");
      displaymute.setDescription("You do not have permissions to mute.");
      msg.reply(displaymute);
      return;
    }
    try{
      msg.mentions.members.first().roles.add("id");
      const displaymute = new MessageEmbed();
      displaymute.setTitle("User Muted");
      displaymute.setColor("3398FF");
      displaymute.setDescription(msg.mentions.members.first().toString() + " has been muted.");
      msg.channel.send(displaymute);
    }catch (err){
      const displaymute = new MessageEmbed();
      displaymute.setTitle("Error!");
      displaymute.setColor("3398FF");
      displaymute.setDescription("There was an error muting this member. Please ensure both you and the bot have the proper permissions and the mentioned user is muteable.");
      msg.reply(displaymute)
    }
  }

  if(msg.toString().startsWith(".unmute") || msg.toString().startsWith("!unmute")){
    if(!msg.member.hasPermission('MANAGE_ROLES')){
      const displaymute = new MessageEmbed();
      displaymute.setTitle("Unmute Command");
      displaymute.setColor("3398FF");
      displaymute.setDescription("You do not have permissions to unmute.");
      msg.reply(displaymute);
      return;
    }
    try{
      msg.mentions.members.first().roles.remove("id");
      const displaymute = new MessageEmbed();
      displaymute.setTitle("User Unmuted");
      displaymute.setColor("3398FF");
      displaymute.setDescription(msg.mentions.members.first().toString() + " has been unmuted.");
      msg.channel.send(displaymute);
    }catch (err){
      const displaymute = new MessageEmbed();
      displaymute.setTitle("Error!");
      displaymute.setColor("3398FF");
      displaymute.setDescription("There was an error unmuting this member. Please ensure both you and the bot have the proper permissions and the mentioned user is able to be unmuted.");
      msg.reply(displaymute)
    }
  }
})

async function verificationfunc(vm){
  const verifyscreen = new MessageEmbed();
    verifyscreen.setTitle("Verification Process:");
    verifyscreen.setColor("3398FF");
    verifyscreen.setDescription("The verification process has begun. \nWhat is your Roblox username?\n Type `cancel` to end this process.");
    let dmchannel = await vm.author.send(verifyscreen);
    let filter = () => true;
    //wait for username
    let collected = await dmchannel.channel.awaitMessages(filter, {
      max: 1,
      time: 60000,
    })
    if (collected.size>0){
      let enteredusername = collected.first().toString();
      //vm.author.send(Roblox.getIdFromUsername(enteredusername));
      if (enteredusername.toLowerCase()==="cancel"){
        return vm.author.send("The verification has been cancelled.");
      }
      let valid = true;
      const userId = await Roblox.getIdFromUsername(enteredusername).catch(function(error) {
          vm.author.send("That is not a valid username. Please start a new verification session.");
            valid=false;
            });
      if(!valid){
        return;
      }
      const ingroup = await Roblox.getRankInGroup(id, userId);
        if(ingroup==0){
            return vm.author.send("You are not in the Marko's Hotels Roblox group. Please join to verify and start this process again.");
        }
      let dmchannel_type = await vm.author.send("What verification method would you like to use? Type `g` for game-join verification and `s` for status verification");;
      let filter_type = () => true;
      let cverifytype = await dmchannel_type.channel.awaitMessages(filter_type, {
        max: 1,
        time: 60000,
      })
      if (cverifytype.size!=1){
        return vm.author.send("The verification has timed out. Please start a new session.");
      }
      let vt=cverifytype.first().toString();
      if(vt.toLowerCase === "cancel"){
        return vm.author.send("The verification has been cancelled.");
      }
      if(vt.toLowerCase() === "g"){
        vm.author.send("Please join the following game within two minutes to verify:\n https://www.roblox.com/games/6706778971/Verification");
        /*let filter_joinlogs = () => true;
        let joinlogscollect = await client.channels.cache.get('id').awaitMessages(filter_joinlogs,{
          time: 120000,
        })
        if(joinlogscollect.has(enteredusername)){
          vm.author.send("Your Roblox account has been verified. Thank you for taking you time, and hope you enjoy your time at Marko's Hotels.");
        }*/
        const filter_joinlogs = () => true;
        const collector = client.channels.cache.get('id').createMessageCollector(filter_joinlogs, {time: 120000});
        var found = false;
        collector.on('collect', m => {
          if(m.content.toString().toLowerCase() === enteredusername.toLowerCase()){
            found = true;
            collector.stop();
          }
        });
        const Grank = await Roblox.getRankNameInGroup(id, userId);
        collector.on('end', collected => {
          if(!found){
            vm.author.send("The verification failed. Please try again.");
          }else{
            vm.author.send("Your Roblox account has been verified. Thank you for taking your time, and hope you enjoy your stay at Marko's Hotels.");
            let verifiedmember = vm.member;
            verifiedmember.roles.add("id");
            var pref = "";

            if (Grank.toString() === "1- Hotel Guest"){
              verifiedmember.roles.add("id");
              pref = "Hotel Guest";
            }else if(Grank.toString() === "2- Suspended"){
              verifiedmember.roles.add("id");
            }else if(Grank.toString() === "3- Honored Guest"){
              verifiedmember.roles.add("id");
              pref = "LR";
            }else if(Grank.toString() === "4- Receptionist"){
              verifiedmember.roles.add("id");
              pref = "MR";
            }else if(Grank.toString() === "5- Barista"){
              verifiedmember.roles.add("id");
              pref = "MR";
            }else if(Grank.toString() === "6- Room Service"){
              verifiedmember.roles.add("id");
              pref = "MR";
            }else if(Grank.toString() === "7- Customer Service"){
              verifiedmember.roles.add("id");
              pref = "HR";
            }else if(Grank.toString() === "8- Head of Reception"){
              verifiedmember.roles.add("id");
              pref = "HR";
            }else if(Grank.toString() === "9- Supervisor"){
              verifiedmember.roles.add("id");
              pref = "HR";
            }else if(Grank.toString() === "10- Assistant Manager"){
              verifiedmember.roles.add("id");
              pref = "HR";
            }else if(Grank.toString() === "11- Manager"){
              verifiedmember.roles.add("id");
              pref = "HR";
            }else if(Grank.toString() === "12- Shift Manager"){
              verifiedmember.roles.add("id");
              pref = "SHR";
            }else if(Grank.toString() === "13- Board of Directors"){
              verifiedmember.roles.add("id");
              pref = "SHR";
            }else if(Grank.toString() === "14- Executive"){
              verifiedmember.roles.add("id");
              pref = "SSHR";
            }else if(Grank.toString() === "15- Executive Director"){
              verifiedmember.roles.add("id");
              pref = "SSHR";
            }else if(Grank.toString() === "16- President"){ 
              verifiedmember.roles.add("id");
              pref = "SSHR";
            }else if(Grank.toString() === "17- Development Team"){
              verifiedmember.roles.add("id");
              pref = "SSHR";
            }else if(Grank.toString() === "[-] 18- Chairperson"){
              verifiedmember.roles.add("id");
              pref = "SSHR";
            }else if(Grank.toString() === "[-] 19- Co Founder"){
              verifiedmember.roles.add("id");
              pref = "SSHR";
            }else if(Grank.toString() === "[-] 20- Founder"){
              verifiedmember.roles.add("id");
              pref = "SSHR";
            }else if(Grank.toString() === "H- Holder"){
              verifiedmember.roles.add("id");
              pref = "SSHR";
            }
            let newnick = pref+" · "+enteredusername;
            //vm.author.send(newnick);
            if(newnick.length>32){
              newnick = enteredusername;
            }
            verifiedmember.setNickname(newnick);
            //vm.members.member.roles.add("id");
          }
        });
      }else if(vt.toLowerCase() === "s"){

        vm.author.send("Please replace your current Roblox status with: ``" + vm.author.id.toString() + "`` and type ``done`` here once it has been done.");
        const filter_done = () => true;
        const collector = vm.channel.createMessageCollector(filter_done, {time: 120000});
        collector.on('collect', m => {
          if(m.content.toString().toLowerCase() === "done"){
            collector.stop();
          }
        });
        const status = await Roblox.getBlurb(userId);
        const Grank = await Roblox.getRankNameInGroup("id", userId);
        collector.on('end', collected => {
          console.log(status + vm.author.id.toString());
          if(status !== vm.author.id.toString()){
            vm.author.send("The verification failed. Please try again.");
          }else{
            vm.author.send("Your Roblox account has been verified. Thank you for taking your time, and hope you enjoy your stay at Marko's Hotels.");
            let verifiedmember = vm.member;
            verifiedmember.roles.add("id");
            var pref = "";
            if (Grank.toString() === "1- Hotel Guest"){
              verifiedmember.roles.add("id");
              pref = "Hotel Guest";
            }else if(Grank.toString() === "2- Suspended"){
              verifiedmember.roles.add("id");
            }else if(Grank.toString() === "3- Honored Guest"){
              verifiedmember.roles.add("id");
              pref = "LR";
            }else if(Grank.toString() === "4- Receptionist"){
              verifiedmember.roles.add("id");
              pref = "MR";
            }else if(Grank.toString() === "5- Barista"){
              verifiedmember.roles.add("id");
              pref = "MR";
            }else if(Grank.toString() === "6- Room Service"){
              verifiedmember.roles.add("id");
              pref = "MR";
            }else if(Grank.toString() === "7- Customer Service"){
              verifiedmember.roles.add("id");
              pref = "HR";
            }else if(Grank.toString() === "8- Head of Reception"){
              verifiedmember.roles.add("id");
              pref = "HR";
            }else if(Grank.toString() === "9- Supervisor"){
              verifiedmember.roles.add("id");
              pref = "HR";
            }else if(Grank.toString() === "10- Assistant Manager"){
              verifiedmember.roles.add("id");
              pref = "HR";
            }else if(Grank.toString() === "11- Manager"){
              verifiedmember.roles.add("id");
              pref = "HR";
            }else if(Grank.toString() === "12- Shift Manager"){
              verifiedmember.roles.add("id");
              pref = "SHR";
            }else if(Grank.toString() === "13- Board of Directors"){
              verifiedmember.roles.add("id");
              pref = "SHR";
            }else if(Grank.toString() === "14- Executive"){
              verifiedmember.roles.add("id");
              pref = "SSHR";
            }else if(Grank.toString() === "15- Executive Director"){
              verifiedmember.roles.add("id");
              pref = "SSHR";
            }else if(Grank.toString() === "16- President"){ 
              verifiedmember.roles.add("id");
              pref = "SSHR";
            }else if(Grank.toString() === "17- Development Team"){
              verifiedmember.roles.add("id");
              pref = "SSHR";
            }else if(Grank.toString() === "[-] 18- Chairperson"){
              verifiedmember.roles.add("id");
              pref = "SSHR";
            }else if(Grank.toString() === "[-] 19- Co Founder"){
              verifiedmember.roles.add("id");
              pref = "SSHR";
            }else if(Grank.toString() === "[-] 20- Founder"){
              verifiedmember.roles.add("id");
              pref = "SSHR";
            }else if(Grank.toString() === "H- Holder"){
              verifiedmember.roles.add("id");
              pref = "SSHR";
            }
            let newnick = pref+" · "+enteredusername;
            //vm.author.send(newnick);
            if(newnick.length>32){
              newnick = enteredusername;
            }
            verifiedmember.setNickname(newnick);
          }
        });
      }else{
        vm.author.send("Please enter a valid method of verification. `g`/`s`");
      }
    }else{
      vm.author.send("The verification has timed out. Please start a new session.");
    }
}

