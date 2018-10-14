import { Input, Component, OnInit } from "@angular/core";

@Component({
    selector: "spinner",
    templateUrl: "spinner.component.html"
})
export class SpinnerComponent implements OnInit {
    spinnerClass: string;
    @Input() loading: boolean;

    constructor() { }

    public ngOnInit(): void {
    }
}
