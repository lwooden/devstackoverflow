import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date()
  const timeDifferenceInSeconds = Math.floor(
    (now.getTime() - createdAt.getTime()) / 1000
  )

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  }

  let intervalType
  let intervalValue

  for (const interval in intervals) {
    intervalValue = Math.floor(timeDifferenceInSeconds / intervals[interval])
    if (intervalValue >= 1) {
      intervalType = interval
      break
    }
  }

  if (intervalValue > 1 || intervalValue === 0) {
    intervalType += "s"
  }

  return `${intervalValue} ${intervalType} ago`
}

export const formatAndDivideNumber = () => {}

export const formatBigNumber = (number: number): string => {
  let result
  let divisor

  if (number >= 1e6) {
    result = (number / 1e6).toFixed(2)
    divisor = "M"
  } else if (number >= 1e3) {
    result = (number / 1e3).toFixed(0)
    divisor = "K"
  } else {
    result = number
    divisor = ""
  }

  return `${result}${divisor}`
}

// Example usage:
// const bigNumber = 1234567
// const formattedNumber = formatBigNumber(bigNumber)
// console.log(formattedNumber) // Output: "1.23M"
// console.log(bigNumber)
