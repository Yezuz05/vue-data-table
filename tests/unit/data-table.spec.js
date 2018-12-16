import { mount } from "@vue/test-utils"
import DataTable from './../../src/components/DataTable.vue'

describe('DataTable.vue', () =>{
    it('sets current page to 1', ()=>{
        const wrapper = mount(DataTable);
        expect(wrapper.vm.currentPage).toBe(1);
    })
})