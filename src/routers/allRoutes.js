const express = require("express");
const router = express.Router();
const playerRosterSchema = require("../playersRoster/firstroster");


router.get("/all", (req, res)=> {
    playerRosterSchema.find().then((data)=> res.json(data))
})

router.get("/:team", (req,res) => {
    const { team } = req.params
    team[0].toUpperCase()
    playerRosterSchema.find({ team })
    .then((data)=> res.json(data))
    .catch(() => res.json("Haven't players"))
})

router.get("/:team/:number", (req,res) =>{
    const {number} = req.params;
    const { team } = req.params;
    if(!number){
        return res.json({
            code: 400,
            error: "Player Number is requerid"
        })
    }
    playerRosterSchema.find({number , team})
    .then((data)=> res.json(data))
    .catch(() => res.json("Player Number not found"))
})

router.post("/create", async (req,res) => {
    const player = playerRosterSchema(req.body);

    const nameNewPlayer = player.name

    let checkIfExist = await playerRosterSchema.findOne({name: nameNewPlayer})
    if(checkIfExist){
        if(checkIfExist.name == nameNewPlayer){
            return res.status(404).json({
                error: 404,
                message: "This player alredy exist."
            })
        }
    }
    player.save()
    .then((data) => res.json(data))
})

router.put("/:number/edit", (req,res) => {
    const { number } = req.params;
    const { name, age, birth, height, team, position } = req.body;

    playerRosterSchema
    .updateOne({number}, { $set: { name, age, birth, height, team, position } })
    .then((data)=> res.json(data))
    .catch((error) => res.json({message:error}))
})

router.delete("/remove/:team/:number", async (req,res) => {
    const { team } = req.params
    const { number } = req.params;

    const himDeletedName = await playerRosterSchema.findOne({team , number})

    playerRosterSchema.deleteOne({team , number}).then((data) => {if(data.deletedCount === 1){
        return res.json({
            message:`Player ${himDeletedName.name} of team ${team} was deleted correctly.`
        })
    }else{
        res.json({
            error: `This player doesnt exist or alredy was deleted, check again him equipment or name.`
        })
    }
    })
})

module.exports = router;