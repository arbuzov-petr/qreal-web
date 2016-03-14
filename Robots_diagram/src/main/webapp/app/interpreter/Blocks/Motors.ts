/*
 * Copyright Lada Gagina
 * Copyright Anton Gulikov
 * Copyright Vladimit Zakharov
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

class Motors extends Block {
    static run(node, graph, nodesMap, linksMap, forward, env, timeline): string {
        var output = "Motors forward/backward" + "\n";
        var ports = [];
        var power = 0;
        var nodeId = InterpretManager.getIdByNode(node, nodesMap);
        var links = InterpretManager.getOutboundLinks(graph, nodeId);

        var properties = node.getChangeableProperties();
        for (var p in properties) {
            if (p == "Ports") {
                ports = properties[p].value.replace(/ /g,'').split(",");
            }
            if (p == "Power") {
                var parser = new Parser(properties[p].value, env);
                parser.parseExpression();
                var models = timeline.getRobotModels();
                var model = models[0];
                if (parser.error == null) {
                    power = parser.result;
                    if (power < 0 || power > 100) {
                        output += "Error: incorrect power value";
                    } else {
                        output += "Ports: " + ports + "\n" + "Power: " + power + "\n";

                        power = (forward) ? power : -power;

                        for (var i = 0; i < ports.length; i++) {
                            var motor: Motor = <Motor> model.getDeviceByPortName(ports[i]);
                            if (motor) {
                                motor.setPower(power);
                            } else {
                                output += "Error: Incorrect port name " + ports[i];
                            }
                        }

                        if (links.length == 1) {
                            var nextNode = nodesMap[links[0].get('target').id];
                            output += Factory.run(nextNode, graph, nodesMap, linksMap, env, timeline);
                        } else if (links.length > 1) {
                            output += "Error: too many links\n";
                        }
                    }
                } else {
                    output += "Error: " + parser.error + "\n";
                }
            }
        }

        return output;
    }
}