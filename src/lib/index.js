import { computed, reactive } from 'vue'
import axios from 'axios'

export const airtable = axios.create({
  baseURL: 'https://hc-airtable-caching-proxy.netlify.app/api/v1/airtable/app0NLfFdNXwgtMpY',
})

export const staff = reactive({
  error: '',
  loading: false,
  data: [],
})

export const departments = reactive({
  error: '',
  loading: false,
  data: [],
})

//

export async function fetchStaff() {
  try {
    staff.loading = true
    const { data } = await airtable.get('/staff', {
      params: {
        view: 'AppView',
      },
    })
    staff.data = data.records
  } catch (error) {
    staff.error = error.message
  } finally {
    staff.loading = false
  }
}

export async function fetchDepartments() {
  try {
    departments.loading = true
    const { data } = await airtable.get('/departments', {
      params: {
        view: 'AppView',
      },
    })
    departments.data = data.records
  } catch (error) {
    departments.error = error.message
  } finally {
    departments.loading = false
  }
}

export const fetchAll = () => Promise.all([fetchStaff(), fetchDepartments()])

export const staffMemberOfDepartment = (
  departmentId,
  field // 'PRS' or 'MRS'
) => {
  const department = departments.data.find((x) => x.id == departmentId)
  const staffMemberId = department?.fields?.[field][0]
  return staff.data.find((x) => x.id == staffMemberId) || null
}

export const departmentsOfStaffMember = (staffMemberId) => {
  const staffMember = staff.data.find((x) => x.id == staffMemberId)
  const PRSAssignments = staffMember?.fields?.PRSAssignments || []
  const MRSAssignments = staffMember?.fields?.MRSAssignments || []
  const departmentIds = new Set([...PRSAssignments, ...MRSAssignments])
  return departments.data.filter((x) => departmentIds.has(x.id)) || []
}
