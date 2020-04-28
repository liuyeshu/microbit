
/**
 * 使用此文件来定义自定义函数和图形块。
 * 想了解更详细的信息，请前往 https://makecode.microbit.org/blocks/custom
 */

/*****************************************************************************************************************************************
 *    手柄 *****************************************************************************************************************************
 ****************************************************************************************************************************************/
//% color="#FF7F00" weight=21 icon="\uf185"
namespace microbit_手柄 {

    export enum enRocker {
        //% blockId="Nostate" block="无"
        Nostate = 0,
        //% blockId="Up" block="向上"
        Up,
        //% blockId="Down" block="向下"
        Down,
        //% blockId="Left" block="向左"
        Left,
        //% blockId="Right" block="向右"
        Right,
        //% blockId="Press" block="按下"
        Press
    }
        export enum enButtonState {
        //% blockId="Press" block="按下"
        Press = 0,
        //% blockId="Realse" block="松开"
        Realse = 1
    }
    
    export enum enButton {
        
        BUTTON1 = 0,
        BUTTON2,
        BUTTON3,
        BUTTON4
    }

    //% blockId=mbit_RockerState block="手柄摇杆状态为| %value 时"
    //% weight=96
    //% blockGap=10
    //% color="#FF7F00"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=6
    export function RockerState(value: enRocker): boolean {

        pins.setPull(DigitalPin.P8, PinPullMode.PullUp);
        let x = pins.analogReadPin(AnalogPin.P1);
        let y = pins.analogReadPin(AnalogPin.P2);
        let z = pins.digitalReadPin(DigitalPin.P8);
        let now_state = enRocker.Nostate;

        if (x < 200) // 上
        {

            now_state = enRocker.Up;

        }
        else if (x > 900) //下
        {

            now_state = enRocker.Down;
        }
        else  // 左右
        {
            if (y < 200) //右
            {
                now_state = enRocker.Right;
            }
            else if (y > 900) //左
            {
                now_state = enRocker.Left;
            }
        }
        if (z == 0)
            now_state = enRocker.Press;
        if (now_state == value)
            return true;
        else
            return false;
    }

    //% blockId=mbit_ButtonState block="手柄按键|%num|状态为 %value 时"
    //% weight=96
    //% blockGap=10
    //% color="#FF7F00"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=6
   export function ButtonState(num: enButton, value: enButtonState): boolean {
         let temp = false;
         switch (num) {
            case enButton.BUTTON1: {
              pins.setPull(DigitalPin.P13, PinPullMode.PullUp);
              if (pins.digitalReadPin(DigitalPin.P13) == value) {
                temp = true;
              }
              else {
                temp = false;
              }
              break;
            }
            case enButton.BUTTON2: {
              pins.setPull(DigitalPin.P14, PinPullMode.PullUp);
              if (pins.digitalReadPin(DigitalPin.P14) == value) {
                temp = true;
              }
              else {
                temp = false;
              }
              break;
            }
            case enButton.BUTTON3: {
              pins.setPull(DigitalPin.P15, PinPullMode.PullUp);
              if (pins.digitalReadPin(DigitalPin.P15) == value) {
                temp = true;
              }
              else {
                temp = false;
              }
              break;
            }
            case enButton.BUTTON4: {
              pins.setPull(DigitalPin.P16, PinPullMode.PullUp);
              if (pins.digitalReadPin(DigitalPin.P16) == value) {
                temp = true;
              }
              else {
                temp = false;
              }
              break;
            }
        }
        return temp;         
    }
    
    //% blockId==onKey block="手柄按键 %pin |按下时"
    //% weight=94
    //% blockGap=10
    //% color="#FF7F00"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function ButtonPress(pin: enButton, body: Action): void {
        let Pin = 0;
        pins.setPull(DigitalPin.P13, PinPullMode.PullUp);
        pins.setPull(DigitalPin.P14, PinPullMode.PullUp);
        pins.setPull(DigitalPin.P15, PinPullMode.PullUp);
        pins.setPull(DigitalPin.P16, PinPullMode.PullUp); 
        if (pin == enButton.BUTTON1) {
            Pin = DigitalPin.P13;
        } else if (pin == enButton.BUTTON2) {
            Pin = DigitalPin.P14;
        } else if (pin == enButton.BUTTON3) {
            Pin = DigitalPin.P15;
        } else if (pin == enButton.BUTTON4) {
            Pin = DigitalPin.P16;
        }
        pins.onPulsed(Pin, PulseValue.Low, body);
    }
}

/*****************************************************************************************************************************************
 *    机器人 *****************************************************************************************************************************
 ****************************************************************************************************************************************/
//% color="#FF7F00" weight=21 icon="\uf185"
namespace microbit_机器人 {
    export enum PowerState {
        //% blockId="POWER_OFF" block="关闭"
        OFF = 0,
        //% blockId="POWER_ON" block="开启"
        ON 
    }

    export enum PowerIndex {
        //% blockId="POWER_INDEX_ONE" block="电源1"
        ONE = 0,
        //% blockId="POWER_INDEX_TWO" block="电源2"
        TWO 
    }

    export enum MotorIndex {
        //% blockId="MOTOR_INDEX_ONE" block="电机1"
        ONE = 0,
        //% blockId="MOTOR_INDEX_TWO" block="电机2"
        TWO 
    }

    export enum MotorState {
        //% blockId="MOTOR_STOP" block="停止"
        STOP = 0,
        //% blockId="MOTOR_FOREWARD" block="正转"
        FOREWARD,
        //% blockId="MOTOR_BACKWARD" block="反转"
        BACKWARD
    }

    //% blockId=mbit_IoSet block="设置引脚|%pin 值为|%value"
    //% weight=100
    //% blockGap=10
    //% color="#FF7F00"
    //% value.min=0 value.max=1
    export function IoSet(pin: DigitalPin, value: number): void {

        pins.setPull(pin, PinPullMode.PullUp);
        pins.digitalWritePin(pin, value);
    }

    //% blockId=mbit_PowerCtrl block="设置电源|%index 状态为|%state"
    //% weight=100
    //% blockGap=10
    //% color="#FF7F00"
    //% value.min=1 value.max=2
    export function PowerCtrl(index: PowerIndex, state: PowerState): void {
        led.enable(false)
        if(PowerIndex.ONE == index)
        {
            pins.setPull(DigitalPin.P9, PinPullMode.PullUp);
            if(PowerState.ON == state)
            {
                pins.digitalWritePin(DigitalPin.P9, 1);
            }
            else
            {
                pins.digitalWritePin(DigitalPin.P9, 0);
            }
        }
        else
        {
            pins.setPull(DigitalPin.P8, PinPullMode.PullUp);
            if(PowerState.ON == state)
            {
                pins.digitalWritePin(DigitalPin.P8, 1);
            }
            else
            {
                pins.digitalWritePin(DigitalPin.P8, 0);
            }
        }
    }

    //% blockId=mbit_PowerOpen block="打开电源|%index"
    //% weight=100
    //% blockGap=10
    //% color="#FF7F00"
    //% value.min=1 value.max=2
    export function PowerOpen(index: number): void {
        if(1 == index)
        {
            pins.setPull(DigitalPin.P9, PinPullMode.PullUp);
            pins.digitalWritePin(DigitalPin.P9, 1);
        }
        else
        {
            pins.setPull(DigitalPin.P8, PinPullMode.PullUp);
            pins.digitalWritePin(DigitalPin.P8, 1);
        }
    }

    //% blockId=mbit_PowerClose block="关闭电源|%index"
    //% weight=100
    //% blockGap=10
    //% color="#FF7F00"
    //% value.min=1 value.max=2
    export function PowerClose(index: number): void {
        if(1 == index)
        {
            pins.setPull(DigitalPin.P9, PinPullMode.PullUp);
            pins.digitalWritePin(DigitalPin.P9, 0);
        }
        else
        {
            pins.setPull(DigitalPin.P8, PinPullMode.PullUp);
            pins.digitalWritePin(DigitalPin.P8, 0);
        }
    }

    //% blockId=mbit_MotorCtrl block="设置电机|%index 状态为|%state"
    //% weight=100
    //% blockGap=10
    //% color="#FF7F00"
    //% value.min=1 value.max=2
    export function Motor_Ctrl(index: MotorIndex, state: MotorState): void {
        led.enable(false)
        switch(index)
        {
            case MotorIndex.ONE:
                switch(state)
                {
                    case MotorState.STOP:
                        pins.setPull(DigitalPin.P13, PinPullMode.PullUp);
                        pins.digitalWritePin(DigitalPin.P13, 1);
                        pins.setPull(DigitalPin.P14, PinPullMode.PullUp);
                        pins.digitalWritePin(DigitalPin.P14, 1);
                        break;
                    break;
                case MotorState.FOREWARD:
                        pins.setPull(DigitalPin.P13, PinPullMode.PullUp);
                        pins.digitalWritePin(DigitalPin.P13, 0);
                        pins.setPull(DigitalPin.P14, PinPullMode.PullUp);
                        pins.digitalWritePin(DigitalPin.P14, 1);
                        break;
                    break;
                case MotorState.BACKWARD:
                        pins.setPull(DigitalPin.P13, PinPullMode.PullUp);
                        pins.digitalWritePin(DigitalPin.P13, 1);
                        pins.setPull(DigitalPin.P14, PinPullMode.PullUp);
                        pins.digitalWritePin(DigitalPin.P14, 0);
                        break;
                    break;                   
                    default:
                    break;
                }
                break;
            case MotorIndex.TWO:
                switch(state)
                {
                    case MotorState.STOP:
                        //pins.setPull(DigitalPin.P6, PinPullMode.PullUp);
                        pins.digitalWritePin(DigitalPin.P6, 0);
                        //pins.setPull(DigitalPin.P7, PinPullMode.PullUp);
                        pins.digitalWritePin(DigitalPin.P7, 0);
                        break;
                    break;
                case MotorState.FOREWARD:
                        //pins.setPull(DigitalPin.P6, PinPullMode.PullUp);
                        pins.digitalWritePin(DigitalPin.P6, 0);
                        //pins.setPull(DigitalPin.P7, PinPullMode.PullUp);
                        pins.digitalWritePin(DigitalPin.P7, 1);
                        break;
                    break;
                case MotorState.BACKWARD:
                        //pins.setPull(DigitalPin.P6, PinPullMode.PullUp);
                        pins.digitalWritePin(DigitalPin.P6, 1);
                        //pins.setPull(DigitalPin.P7, PinPullMode.PullUp);
                        pins.digitalWritePin(DigitalPin.P7, 0);
                        break;
                    break;                   
                    default:
                    break;
                }
                break;
            default:
            break;
        }
    }

    //% blockId=mbit_Servo block="Servo|pin %pin|value %value"
    //% weight=100
    //% blockGap=10
    //% color="#0000CD"
    //% value.min=0 value.max=180
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=9
    export function Servo(pin: AnalogPin, value: number): void {

        pins.servoWritePin(pin, value);

    }

}

/*****************************************************************************************************************************************
 *    智能小车 *****************************************************************************************************************************
 ****************************************************************************************************************************************/
//% color="#FF7F00" weight=21 icon="\uf185"
namespace microbit_小车 {
    export enum LedState {
        //% blockId="STATE_OFF" block="关闭"
        OFF = 0,
        //% blockId="STATE_ON" block="开启"
        ON 
    }

    export enum LedForwardIndex {
        //% blockId="LEFT" block="左边"
        LEFT = 0,
        //% blockId="RIGHT" block="右边"
        RIGHT 
    }

    export enum LineSensorIndex {
        //% blockId="LEFT" block="左边"
        LEFT = 0,
        //% blockId="RIGHT" block="右边"
        RIGHT 
    }

    export enum LineState {
        //% blockId="WHITE" block="白线"
        WHITE = 0,
        //% blockId="BLACK" block="黑线"
        BLACK = 1
    }

    export enum LightSensorIndex {
        //% blockId="LEFT" block="左边"
        LEFT = 0,
        //% blockId="RIGHT" block="右边"
        RIGHT 
    }

    export enum MusicIndex {
        dadadum = 0,
        entertainer,
        prelude,
        ode,
        nyan,
        ringtone,
        funk,
        blues,

        birthday,
        wedding,
        funereal,
        punchline,
        baddy,
        chase,
        ba_ding,
        wawawawaa,
        jump_up,
        jump_down,
        power_up,
        power_down
    }

    export enum MotorIndex {
        //% blockId="MOTOR_LEFT" block="左边"
        LEFT = 0,
        //% blockId="MOTOR_RIGHT" block="右边"
        RIGHT 
    }

    export enum MotorState {
        //% blockId="MOTOR_STOP" block="停止"
        STOP = 0,
        //% blockId="MOTOR_FOREWARD" block="正转"
        FOREWARD,
        //% blockId="MOTOR_BACKWARD" block="反转"
        BACKWARD
    }

    export enum CarState {
        //% blockId="CAR_STOP" block="停止"
        STOP = 0,
        //% blockId="CAR_FOREWARD" block="前行"
        FOREWARD,
        //% blockId="CAR_LEFT_FOREWARD" block="左前行"
        LEFT_FOREWARD,
        //% blockId="CAR_RIGHT_FOREWARD" block="右前行"
        RIGHT_FOREWARD,
        //% blockId="CAR_BACKWARD" block="后退"
        BACKWARD,
        //% blockId="CAR_LEFT_BACKWARD" block="左后退"
        LEFT_BACKWARD,
        //% blockId="CAR_RIGHT_BACKWARD" block="右后退"
        RIGHT_BACKWARD
    }

    //% blockId=mbit_IoSet block="设置引脚|%pin 值为|%value"
    //% weight=100
    //% blockGap=10
    //% color="#FF7F00"
    //% value.min=0 value.max=1
    export function IoSet(pin: DigitalPin, value: number): void {

        pins.setPull(pin, PinPullMode.PullUp);
        pins.digitalWritePin(pin, value);
    }

    //% blockId=mbit_LedForwardCtrl block="设置 |%index 前照灯状态为|%state"
    //% weight=100
    //% blockGap=10
    //% color="#FF7F00"
    export function LedForwardCtrl(index: LedForwardIndex, state: LedState): void {
        if(LedForwardIndex.LEFT == index)
        {
            pins.setPull(DigitalPin.P12, PinPullMode.PullUp);
            if(LedState.ON == state)
            {
                pins.digitalWritePin(DigitalPin.P12, 1);
            }
            else
            {
                pins.digitalWritePin(DigitalPin.P12, 0);
            }
        }
        else
        {
            pins.setPull(DigitalPin.P16, PinPullMode.PullUp);
            if(LedState.ON == state)
            {
                pins.digitalWritePin(DigitalPin.P16, 1);
            }
            else
            {
                pins.digitalWritePin(DigitalPin.P16, 0);
            }
        }
    }

    //% blockId=mbit_MotroCtrl block="设置 |%index 电机状态为|%state"
    //% weight=100
    //% blockGap=10
    //% color="#FF7F00"
    export function MotorCtrl(index: MotorIndex, state: MotorState): void {
        switch(index)
        {
                case MotorIndex.RIGHT:
                    switch(state)
                    {
                        case MotorState.STOP:
                            pins.setPull(DigitalPin.P5, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P5, 0);
                            pins.setPull(DigitalPin.P11, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P11, 0);
                            break;
                        break;
                    case MotorState.FOREWARD:
                            pins.setPull(DigitalPin.P5, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P5, 1);
                            pins.setPull(DigitalPin.P11, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P11, 0);
                            break;
                        break;
                    case MotorState.BACKWARD:
                            pins.setPull(DigitalPin.P5, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P5, 0);
                            pins.setPull(DigitalPin.P11, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P11, 1);
                            break;
                        break;                   
                        default:
                        break;
                    }
                    break;
                case MotorIndex.LEFT:
                    switch(state)
                    {
                        case MotorState.STOP:
                            pins.setPull(DigitalPin.P15, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P15, 0);
                            pins.setPull(DigitalPin.P14, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P14, 0);
                            break;
                    case MotorState.FOREWARD:
                            pins.setPull(DigitalPin.P15, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P15, 0);
                            pins.setPull(DigitalPin.P14, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P14, 1);
                            break;
                    case MotorState.BACKWARD:
                            pins.setPull(DigitalPin.P15, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P15, 1);
                            pins.setPull(DigitalPin.P14, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P14, 0);
                            break;               
                        default:
                        break;
                    }
                    break;
                default:
                break;
        }
    }

   //% blockId=mbit_CarCtrl block="设置小车状态为|%state"
    //% weight=100
    //% blockGap=10
    //% color="#FF7F00"
    export function CarCtrl(state: CarState): void {
        switch(state)
        {
                case CarState.STOP:
                    //停止
                    MotorCtrl(MotorIndex.LEFT, MotorState.STOP);
                    MotorCtrl(MotorIndex.RIGHT, MotorState.STOP);
                    break;
                case CarState.FOREWARD:
                    //前行
                    MotorCtrl(MotorIndex.LEFT, MotorState.FOREWARD);
                    MotorCtrl(MotorIndex.RIGHT, MotorState.FOREWARD);
                    break;
                case CarState.LEFT_FOREWARD:
                    //左前行
                    MotorCtrl(MotorIndex.LEFT, MotorState.STOP);
                    MotorCtrl(MotorIndex.RIGHT, MotorState.FOREWARD);
                    break;
                case CarState.RIGHT_FOREWARD:
                   //右前行
                    MotorCtrl(MotorIndex.LEFT, MotorState.FOREWARD);
                    MotorCtrl(MotorIndex.RIGHT, MotorState.STOP);
                    break;
                case CarState.BACKWARD:
                    //后退
                    MotorCtrl(MotorIndex.LEFT, MotorState.BACKWARD);
                    MotorCtrl(MotorIndex.RIGHT, MotorState.BACKWARD);
                    break;
                case CarState.LEFT_FOREWARD:
                    //左后退
                    MotorCtrl(MotorIndex.LEFT, MotorState.STOP);
                    MotorCtrl(MotorIndex.RIGHT, MotorState.BACKWARD);
                    break;
                case CarState.RIGHT_FOREWARD:
                   //右后退
                    MotorCtrl(MotorIndex.LEFT, MotorState.BACKWARD);
                    MotorCtrl(MotorIndex.RIGHT, MotorState.STOP);
                    break;                               
                default:
                break;
        }
    }

    //% blockId=mbit_LedRGBCtrl block="设置彩灯 红色 |%redValue 绿色 |%greenValue 蓝色 |%blueValue"
    //% weight=100
    //% blockGap=10
    //% color="#FF7F00"
    //% redValue.min=0 redValue.max=255
    //% greenValue.min=0 greenValue.max=255
    //% blueValue.min=0 blueValue.max=255
    export function LedRGBCtrl(redValue: number, greenValue: number, blueValue: number): void {
        led.enable(false);
        //red
        pins.analogWritePin(AnalogPin.P7, redValue * 1024 / 256);
        
        //green
        pins.analogWritePin(AnalogPin.P9, greenValue * 1024 / 256);

        //blue
        pins.analogWritePin(AnalogPin.P6, blueValue * 1024 / 256);
    }

    //% blockId=mbit_LineSensorChk block="检测到 |%index 寻迹传感器状态为 |%state"
    //% weight=100
    //% blockGap=10
    //% color="#FF7F00"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function LineSensorChk(index: LineSensorIndex, state: LineState): boolean {

        let temp: boolean = false;

        switch (index) {
            case LineSensorIndex.LEFT: {
                if (700 > pins.analogReadPin(AnalogPin.P2)) {
                    if (state == LineState.WHITE) {
                        temp = true;
                    }
                }
                else {
                    if (state == LineState.BLACK) {
                        temp = true;
                    }
                }
                break;
            }

            case LineSensorIndex.RIGHT: {
                if (700 > pins.analogReadPin(AnalogPin.P1)) {
                    if (state == LineState.WHITE) {
                        temp = true;
                    }
                }
                else {
                    if (state == LineState.BLACK) {
                        temp = true;
                    }
                }
                break;
            }
        }
        return temp;
    }

    //% blockId=mbit_EdgeSensorChk block="|%index 边缘传感器检查到边缘"
    //% weight=100
    //% blockGap=10
    //% color="#FF7F00"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function EdgeSensorChk(index: LineSensorIndex): boolean {
        switch (index) {
            case LineSensorIndex.LEFT: 
                if (700 < pins.analogReadPin(AnalogPin.P2)) 
                {
                    return true;
                }
                return false;
            break;
            case LineSensorIndex.RIGHT:
                if (700 < pins.analogReadPin(AnalogPin.P1)) 
                {
                    return true;
                }
                return false;
            break;
            default:
            break;
        }
        return false;
    }

    //% blockId=mbit_LightSensorValueGet block="|%index 亮度传感器值(0-100)"
    //% weight=100
    //% blockGap=10
    //% color="#FF7F00"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function LightSensorValueGet(index: LightSensorIndex): number {

        let temp: number = 0;

        switch (index) {
            case LightSensorIndex.LEFT: {
                temp = pins.analogReadPin(AnalogPin.P2);
                temp = temp * 100 /1024;
                break;
            }

            case LightSensorIndex.RIGHT: {
                temp = pins.analogReadPin(AnalogPin.P1);
                temp = temp * 100 /1024;
                break;
            }
        }
        return temp;
    }

    //% blockId=mbit_UltraSensorValueGet block="超声检测距离(cm)"
    //% color="#FF7F00"
    //% weight=100
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function UltraSensorValueGet(): number {

        // send pulse   
        let list:Array<number> = [0, 0, 0, 0, 0];
        for (let i = 0; i < 5; i++) {
            pins.setPull(DigitalPin.P13, PinPullMode.PullNone);
		        pins.digitalWritePin(DigitalPin.P13, 0);
		        control.waitMicros(2);
		        pins.digitalWritePin(DigitalPin.P13, 1);
		        control.waitMicros(15);
		        pins.digitalWritePin(DigitalPin.P13, 0);
		
		        let d = pins.pulseIn(DigitalPin.P8, PulseValue.High, 43200);
		        list[i] = Math.floor(d / 40)
        }
        list.sort();
        let length = (list[1] + list[2] + list[3])/3;
        return  Math.floor(length);
    }

    //% blockId=mbit_MusicPlay block="播放音乐 |%index"
    //% weight=97
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Music_Car(index: MusicIndex): void {
        switch (index) {
            case MusicIndex.dadadum: music.beginMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once); break;
            case MusicIndex.birthday: music.beginMelody(music.builtInMelody(Melodies.Birthday), MelodyOptions.Once); break;
            case MusicIndex.entertainer: music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once); break;
            case MusicIndex.prelude: music.beginMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once); break;
            case MusicIndex.ode: music.beginMelody(music.builtInMelody(Melodies.Ode), MelodyOptions.Once); break;
            case MusicIndex.nyan: music.beginMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.Once); break;
            case MusicIndex.ringtone: music.beginMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once); break;
            case MusicIndex.funk: music.beginMelody(music.builtInMelody(Melodies.Funk), MelodyOptions.Once); break;
            case MusicIndex.blues: music.beginMelody(music.builtInMelody(Melodies.Blues), MelodyOptions.Once); break;
            case MusicIndex.wedding: music.beginMelody(music.builtInMelody(Melodies.Wedding), MelodyOptions.Once); break;
            case MusicIndex.funereal: music.beginMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once); break;
            case MusicIndex.punchline: music.beginMelody(music.builtInMelody(Melodies.Punchline), MelodyOptions.Once); break;
            case MusicIndex.baddy: music.beginMelody(music.builtInMelody(Melodies.Baddy), MelodyOptions.Once); break;
            case MusicIndex.chase: music.beginMelody(music.builtInMelody(Melodies.Chase), MelodyOptions.Once); break;
            case MusicIndex.ba_ding: music.beginMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once); break;
            case MusicIndex.wawawawaa: music.beginMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once); break;
            case MusicIndex.jump_up: music.beginMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once); break;
            case MusicIndex.jump_down: music.beginMelody(music.builtInMelody(Melodies.JumpDown), MelodyOptions.Once); break;
            case MusicIndex.power_up: music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once); break;
            case MusicIndex.power_down: music.beginMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once); break;
        }
    }
}

/*****************************************************************************************************************************************
 *    扩展板4 *****************************************************************************************************************************
 ****************************************************************************************************************************************/
//% color="#FF7F00" weight=21 icon="\uf185"
namespace microbit_扩展板 {
    export enum ExtBoardLedState {
        //% blockId="STATE_OFF" block="关闭"
        OFF = 0,
        //% blockId="STATE_ON" block="开启"
        ON 
    }

    export enum ExtBoardLightSensorIndex {
        //% blockId="LEFT" block="左边"
        LEFT = 0,
        //% blockId="RIGHT" block="右边"
        RIGHT 
    }

    export enum ExtBoardPowerState {
        //% blockId="POWER_OFF" block="关闭"
        OFF = 0,
        //% blockId="POWER_ON" block="开启"
        ON 
    }

    export enum ExtBoardMusicIndex {
        dadadum = 0,
        entertainer,
        prelude,
        ode,
        nyan,
        ringtone,
        funk,
        blues,

        birthday,
        wedding,
        funereal,
        punchline,
        baddy,
        chase,
        ba_ding,
        wawawawaa,
        jump_up,
        jump_down,
        power_up,
        power_down
    }

    export enum ExtBoardMotorIndex {
        //% blockId="MOTOR_LEFT" block="左边"
        LEFT = 0,
        //% blockId="MOTOR_RIGHT" block="右边"
        RIGHT 
    }

    export enum ExtBoardMotorState {
        //% blockId="MOTOR_STOP" block="停止"
        STOP = 0,
        //% blockId="MOTOR_FOREWARD" block="正转"
        FOREWARD,
        //% blockId="MOTOR_BACKWARD" block="反转"
        BACKWARD
    }

    //% blockId=mbit_ExtBoardLedCtrl block="设置灯状态为|%state"
    //% weight=100
    //% blockGap=10
    //% color="#FF7F00"
    export function ExtBoardLedCtrl(state: ExtBoardLedState): void {
            pins.setPull(DigitalPin.P12, PinPullMode.PullUp);
            if(ExtBoardLedState.ON == state)
            {
                pins.digitalWritePin(DigitalPin.P12, 1);
            }
            else
            {
                pins.digitalWritePin(DigitalPin.P12, 0);
            }
    }

    //% blockId=mbit_ExtBoardMotroCtrl block="设置 |%index 电机状态为|%state"
    //% weight=100
    //% blockGap=10
    //% color="#FF7F00"
    export function ExtBoardMotorCtrl(index: ExtBoardMotorIndex, state: ExtBoardMotorState): void {
        switch(index)
        {
                case ExtBoardMotorIndex.LEFT:
                    switch(state)
                    {
                        case ExtBoardMotorState.STOP:
                            pins.setPull(DigitalPin.P5, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P5, 0);
                            pins.setPull(DigitalPin.P13, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P13, 0);
                            break;
                        break;
                    case ExtBoardMotorState.FOREWARD:
                            pins.setPull(DigitalPin.P5, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P5, 1);
                            pins.setPull(DigitalPin.P13, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P13, 0);
                            break;
                        break;
                    case ExtBoardMotorState.BACKWARD:
                            pins.setPull(DigitalPin.P5, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P5, 0);
                            pins.setPull(DigitalPin.P13, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P13, 1);
                            break;
                        break;                   
                        default:
                        break;
                    }
                    break;
                case ExtBoardMotorIndex.RIGHT:
                    switch(state)
                    {
                        case ExtBoardMotorState.STOP:
                            pins.setPull(DigitalPin.P15, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P15, 0);
                            pins.setPull(DigitalPin.P14, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P14, 0);
                            break;
                        case ExtBoardMotorState.FOREWARD:
                            pins.setPull(DigitalPin.P15, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P15, 0);
                            pins.setPull(DigitalPin.P14, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P14, 1);
                            break;
                        case ExtBoardMotorState.BACKWARD:
                            pins.setPull(DigitalPin.P15, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P15, 1);
                            pins.setPull(DigitalPin.P14, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P14, 0);
                            break;               
                        default:
                        break;
                    }
                    break;
                default:
                break;
        }
    }

    //% blockId=mbit_ExtBoardLedRGBCtrl block="设置彩灯 红色 |%redValue 绿色 |%greenValue 蓝色 |%blueValue"
    //% weight=100
    //% blockGap=10
    //% color="#FF7F00"
    //% redValue.min=0 redValue.max=255
    //% greenValue.min=0 greenValue.max=255
    //% blueValue.min=0 blueValue.max=255
    export function ExtBoardLedRGBCtrl(redValue: number, greenValue: number, blueValue: number): void {
        led.enable(false);
        //red
        pins.analogWritePin(AnalogPin.P7, redValue * 1024 / 256);
        
        //green
        pins.analogWritePin(AnalogPin.P6, greenValue * 1024 / 256);

        //blue
        pins.analogWritePin(AnalogPin.P9, blueValue * 1024 / 256);
    }

    //% blockId=mbit_ExtBoardLightSensorValueGet block="|%index 亮度传感器值(0-100)"
    //% weight=100
    //% blockGap=10
    //% color="#FF7F00"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function ExtBoardLightSensorValueGet(index: ExtBoardLightSensorIndex): number {

        let temp: number = 0;

        switch (index) {
            case ExtBoardLightSensorIndex.LEFT: {
                temp = pins.analogReadPin(AnalogPin.P1);
                temp = temp * 100 /1024;
                break;
            }

            case ExtBoardLightSensorIndex.RIGHT: {
                temp = pins.analogReadPin(AnalogPin.P2);
                temp = temp * 100 /1024;
                break;
            }
        }
        return temp;
    }

    //% blockId=mbit_ExtBoardUltraSensorValueGet block="超声检测距离(cm)"
    //% color="#FF7F00"
    //% weight=100
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function ExtBoardUltraSensorValueGet(): number {
        // send pulse   
        let list:Array<number> = [0, 0, 0, 0, 0];
        for (let i = 0; i < 5; i++) {
                pins.setPull(DigitalPin.P11, PinPullMode.PullNone);
		        pins.digitalWritePin(DigitalPin.P11, 0);
		        control.waitMicros(2);
		        pins.digitalWritePin(DigitalPin.P11, 1);
		        control.waitMicros(15);
		        pins.digitalWritePin(DigitalPin.P11, 0);
		
		        let d = pins.pulseIn(DigitalPin.P8, PulseValue.High, 43200);
		        list[i] = Math.floor(d / 40)
        }
        list.sort();
        let length = (list[1] + list[2] + list[3])/3;
        return  Math.floor(length);
    }

    //% blockId=mbit_ExtBoardPowerCtrl block="设置电源状态为|%state"
    //% weight=100
    //% blockGap=10
    //% color="#FF7F00"
    //% value.min=1 value.max=2
    export function ExtBoardPowerCtrl(state: ExtBoardPowerState): void {
            led.enable(false);
            pins.setPull(DigitalPin.P16, PinPullMode.PullUp);
            if(ExtBoardPowerState.ON == state)
            {
                pins.digitalWritePin(DigitalPin.P16, 1);
            }
            else
            {
                pins.digitalWritePin(DigitalPin.P16, 0);
            }
    }

    //% blockId=mbit_ExtBoardMusicPlay block="播放音乐 |%index"
    //% weight=97
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function ExtBoardMusic_Car(index: ExtBoardMusicIndex): void {
        switch (index) {
            case ExtBoardMusicIndex.dadadum: music.beginMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once); break;
            case ExtBoardMusicIndex.birthday: music.beginMelody(music.builtInMelody(Melodies.Birthday), MelodyOptions.Once); break;
            case ExtBoardMusicIndex.entertainer: music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once); break;
            case ExtBoardMusicIndex.prelude: music.beginMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once); break;
            case ExtBoardMusicIndex.ode: music.beginMelody(music.builtInMelody(Melodies.Ode), MelodyOptions.Once); break;
            case ExtBoardMusicIndex.nyan: music.beginMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.Once); break;
            case ExtBoardMusicIndex.ringtone: music.beginMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once); break;
            case ExtBoardMusicIndex.funk: music.beginMelody(music.builtInMelody(Melodies.Funk), MelodyOptions.Once); break;
            case ExtBoardMusicIndex.blues: music.beginMelody(music.builtInMelody(Melodies.Blues), MelodyOptions.Once); break;
            case ExtBoardMusicIndex.wedding: music.beginMelody(music.builtInMelody(Melodies.Wedding), MelodyOptions.Once); break;
            case ExtBoardMusicIndex.funereal: music.beginMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once); break;
            case ExtBoardMusicIndex.punchline: music.beginMelody(music.builtInMelody(Melodies.Punchline), MelodyOptions.Once); break;
            case ExtBoardMusicIndex.baddy: music.beginMelody(music.builtInMelody(Melodies.Baddy), MelodyOptions.Once); break;
            case ExtBoardMusicIndex.chase: music.beginMelody(music.builtInMelody(Melodies.Chase), MelodyOptions.Once); break;
            case ExtBoardMusicIndex.ba_ding: music.beginMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once); break;
            case ExtBoardMusicIndex.wawawawaa: music.beginMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once); break;
            case ExtBoardMusicIndex.jump_up: music.beginMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once); break;
            case ExtBoardMusicIndex.jump_down: music.beginMelody(music.builtInMelody(Melodies.JumpDown), MelodyOptions.Once); break;
            case ExtBoardMusicIndex.power_up: music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once); break;
            case ExtBoardMusicIndex.power_down: music.beginMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once); break;
        }
    }
}