import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { leftToRightAnimation, rightToLeftAnimation } from 'src/app/animation/enter-leave/enter-leave-animation';
// import { Supplier } from 'src/app/supplier/model/supplier';
// import { SupplierContainerComponent } from 'src/app/supplier/supplier-container/supplier-container.component';

@Component({
  selector: 'app-switch-view',
  templateUrl: './switch-view.component.html',
  styleUrls: ['./switch-view.component.css'],
  animations: [leftToRightAnimation, rightToLeftAnimation]
})
export class SwitchViewComponent implements OnInit {

  static readonly CARD_KEY = 'cardViewTemplate';
  static readonly TABLE_KEY = 'tableViewTemplate';

  @Input() templates: Map<string, TemplateRef<any>>;
  @Input() defaultTemplateKey?: string;
  isCardViewVisible = true;

  constructor() { }

  ngOnInit(): void {
    if (this.defaultTemplateKey){
      this.isCardViewVisible = SwitchViewComponent.CARD_KEY === this.defaultTemplateKey;

    }

  }
  getCardKey(): string{
    return SwitchViewComponent.CARD_KEY;
  }
  getTableKey(): string{
    return SwitchViewComponent.TABLE_KEY;
  }

}
