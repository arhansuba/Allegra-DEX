import { Instruction } from './Instruction';
import { IComputeInputs } from '../interfaces';
export declare class Outputs {
    private inputs;
    private instructions;
    constructor(inputs: IComputeInputs | null, instructions: Instruction[]);
    toJson(): object;
}
