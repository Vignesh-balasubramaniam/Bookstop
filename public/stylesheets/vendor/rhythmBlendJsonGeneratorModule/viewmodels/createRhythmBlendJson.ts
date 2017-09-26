module rhythmBlendTestingApp.viewmodels
{
        export class trackDetails
         {
      
            
            divisionCount: number;
    
            constructor(argDivisionCount:number) 
            {

                this.divisionCount = argDivisionCount;

            }
        }
         

        export class createRhythmBlendJSON 
        {
            
                rhythmDuration: number;
                name: string;
                keywords: string;
                trackDetails: Array<trackDetails>;
                presetId: string;
                constructor(argRhythmDuration: number, argTrackDetails: Array<trackDetails>, argName: string, argKeywords: string, argPreseId:string)
                 {
                    this.trackDetails = argTrackDetails;
                    this.rhythmDuration = argRhythmDuration;
                    this.name = argName;
                    this.keywords = argKeywords;
                    this.presetId = argPreseId;
                }

        }
}