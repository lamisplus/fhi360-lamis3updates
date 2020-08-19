import { Component, OnInit } from '@angular/core';
import { CardViewBoolItemModel, CardViewItem, CardViewTextItemModel } from '@alfresco/adf-core';
import { Module } from '../model/module.model';
import { ModuleUpdateService } from '../services/module.update.service';


@Component({
    selector: 'module-update',
    templateUrl: './module-updates.component.html'
})
export class ModuleUpdatesComponent implements OnInit {
    modules: Module[] = [];
    isUpdating = false;
    installed = false;

    constructor(private service: ModuleUpdateService) {
    }

    ngOnInit(): void {
        this.service.availableUpdates().subscribe(res => this.modules = res)
    }

    getProperties(module: Module): Array<CardViewItem> {
        const properties = [];
        const description = new CardViewTextItemModel({
            label: 'Description',
            value: module.description,
            key: 'desc',
        });
        properties.push(description);
        const active = new CardViewBoolItemModel({
            label: 'Active',
            value: module.active,
            key: 'active',
        });
        properties.push(active);
        const version = new CardViewTextItemModel({
            label: 'version',
            value: module.version,
            key: 'version',
        });
        properties.push(version);
        return properties;
    }

    updateModules() {
        this.isUpdating = true;
        this.installed = false;
        this.service.installUpdates().subscribe(res => {
            this.modules = res;
            this.isUpdating = false;
            this.installed = true;
        })
    }

    previousState() {
        window.history.back();
    }
}
