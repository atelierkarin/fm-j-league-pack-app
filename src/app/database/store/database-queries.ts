import gql from 'graphql-tag';

export const getLatestDatabaseUpdate = gql`
query {
  latestDatabaseUpdate {
    id
    name
    dob
    updateDate
    club
  }
}`;

export const getPlayerByClub = gql`
query getPlayerByClub($clubId: Int!) {
  playerByClub(clubId: $clubId) {
    id,
    name,
    nameEng,
    dob,
    nationality,
    clubId,
    loanClubId,
    squadNo,
    isPlayer,
    isNonPlayer,
    job,
    ca,
    pa,
    positions {
      goalkeeper
      defenderLeft
      defenderCentral
      defenderRight
      defensiveMidfielder
      wingBackLeft
      wingBackRight
      midfielderLeft
      midfielderCentral
      midfielderRight
      attackingMidfielderLeft
      attackingMidfielderCentral
      attackingMidfielderRight
      striker
    }
    updateDate
  }
}`;

export const getPlayer = gql`
query getPlayer ($id: Int!) {
  player(id: $id) {
    id
    basicInfo {
      name
      nameEng
      dob
      nationality
      secondNationality
      isPlayer
      isNonPlayer
      file
      jleagueId
    }
    clubInfo {
      id
      dateJoined
      dateRenew
      job
      squadNumber
    }
    loanInfo {
      id
      dateStart
      dateEnd
      squadNumber
    }
    personalData {
      adaptability
      ambition
      controversy
      loyalty
      perssure
      professionalism
      sportsmanship
      temperament
    }
    jobReferences {
      headCoach
      assistantCoach
      coach
      fitnessCoach
      goalkeepingCoach
      physio
      scout
      chiefDataAnalyst
      headOfSportsScience
      generalManager
      headOfYouthDevelopment
      chairman
    }
    playerData {
      general {
        ca
        pa
        currentReputation
        homeReputation
        worldReputation
        height
        weight
        leftFoot
        rightFoot
      }
      positions {
        goalkeeper
        defenderLeft
        defenderCentral
        defenderRight
        defensiveMidfielder
        wingBackLeft
        wingBackRight
        midfielderLeft
        midfielderCentral
        midfielderRight
        attackingMidfielderLeft
        attackingMidfielderCentral
        attackingMidfielderRight
        striker
      }
      mental {
        aggression
        anticipation
        bravery
        composure
        concentration
        consistency
        decisions
        determination
        dirtiness
        flair
        importantMatches
        leadership
        movement
        positioning
        teamWork
        vision
        workRate
      }
      physical {
        acceleration
        agility
        balance
        injuryProneness
        jumpingReach
        naturalFitness
        pace
        stamina
        strength
      }
      technical {
        corners
        crossing
        dribbling
        finishing
        firstTouch
        freeKicks
        heading
        longShots
        longThrows
        marking
        passing
        penaltyTaking
        tackling
        technique
        versatility
      }
      goalkeeping {
        aerialAbility
        commandOfArea
        communication
        eccentricity
        handling
        kicking
        oneOnOnes
        reflexes
        rushingOut
        tendencyToPunch
        throwing
      }
    }
    nonPlayerData {
      ca
      pa
      currentReputation
      homeReputation
      worldReputation
    }
  }
}
`