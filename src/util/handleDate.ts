interface IFormatDate {
  year: number,
  month: number,
  day: number,
  hours: string,
  minutes: string,
  seconds: string
}

const date = ref(new Date())
const startDate = ref('')
const endDate = ref('')
export default function handleDate() {
  // 函数重载，根据参数的个数和类型判断后返回
  function formatDate(date: Date, format: string): string
  function formatDate(date?: Date): IFormatDate
  function formatDate(d = date.value,format?:string) {
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    const day = d.getDate()
    const hours = d.getHours().toString().padStart(2,'0')
    const minutes = d.getMinutes().toString().padStart(2,'0')
    const seconds = d.getSeconds().toString().padStart(2,'0')

    if(format === 'y-m-d') {
      const m = month.toString().padStart(2,'0')
      const d = day.toString().padStart(2,'0')
      return `${year}-${m}-${d} `
    } else if (format === 'y/m/d') {
      const m = month.toString().padStart(2,'0')
      const d = day.toString().padStart(2,'0')
      return `${year}/${m}/${d} `
    } else {
      // console.log(month);
      return { year, month, day, hours, minutes, seconds }
    }
  }
  return {
    date,
    // clockDate,
    startDate,
    endDate,
    formatDate,
    // timer
  }
}

