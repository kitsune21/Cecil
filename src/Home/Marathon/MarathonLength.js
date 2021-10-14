import React from 'react'

function MarathonLength({marathonLength}) {

  function returnHoursAndMinutes() {
    return `${parseInt(marathonLength / 60)}:${calculateMinutes(marathonLength)}`
  }

  function calculateMinutes(length) {
    if(length % 60 < 10) {
      return `0${length % 60}`
    } else {
      return `${length % 60}`
    }
  }

  return(
    <p>
      Length:{marathonLength} total minutes long, {returnHoursAndMinutes()} hours long.
    </p>
  )
}

export default MarathonLength