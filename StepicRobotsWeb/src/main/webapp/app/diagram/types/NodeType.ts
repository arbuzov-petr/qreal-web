/*
 * Copyright vladimir-zakharov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class NodeType {

    private name: string
    private propertiesMap: PropertiesMap;
    private image: string;

    constructor(name: string, propertiesMap: PropertiesMap, image?: string) {
        this.name = name;
        this.propertiesMap = propertiesMap;
        this.image = (image) ? image : null;
    }

    public getName(): string {
        return this.name;
    }

    public getPropertiesMap(): PropertiesMap {
        return this.propertiesMap;
    }

    public getImage(): string {
        return this.image;
    }

}