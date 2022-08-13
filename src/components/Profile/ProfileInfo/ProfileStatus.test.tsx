import {create} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", ()=>{

    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="Hello"  updateStatus={()=>{}}/>)
        const instance = component.getInstance();
        // @ts-ignore
        expect(instance.state.status).toBe("Hello")
    });

    test("after render span should be displayed", () =>{
        const component = create(<ProfileStatus status="Hello"  updateStatus={()=>{}}/>)
        const root = component.root;
        let span = root.findByType("span");
        // @ts-ignore
        expect(span.length).not.toBeNull();
    });

    test("after render input should not  be displayed", () =>{
        const component = create(<ProfileStatus status="Hello"  updateStatus={()=>{}} />)
        const root = component.root;
        expect(()=>{
            let input = root.findByType("input");
        }).toThrow();
    });

    test("after render span should be contains correct status", () =>{
        const component = create(<ProfileStatus status="Hello"  updateStatus={()=>{}} />)
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe("Hello")
    });

    test("input should be displayed in editMode instead of  span", () =>{
        const component = create(<ProfileStatus status="Hello"  updateStatus={()=>{}}/>)
        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input");
        expect(input.props.value).toBe("Hello")
    });

    test("input should be displayed in editMode instead of  span", () =>{
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status="Hello" updateStatus={mockCallback} />)
        const instance = component.getInstance();
        // @ts-ignore
        instance.deactivateEditMod();
        expect(mockCallback.mock.calls).toBe(1)
    });
});