﻿<?xml version="1.0" encoding="utf-8"?>
<serviceModel xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" name="QrealWebAzure" generation="1" functional="0" release="0" Id="8d22bfca-93ee-418c-a8d9-0c82b53841c9" dslVersion="1.2.0.0" xmlns="http://schemas.microsoft.com/dsltools/RDSM">
  <groups>
    <group name="QrealWebAzureGroup" generation="1" functional="0" release="0">
      <componentports>
        <inPort name="MobileCreator:Endpoint1" protocol="http">
          <inToChannel>
            <lBChannelMoniker name="/QrealWebAzure/QrealWebAzureGroup/LB:MobileCreator:Endpoint1" />
          </inToChannel>
        </inPort>
        <inPort name="Web:Endpoint1" protocol="http">
          <inToChannel>
            <lBChannelMoniker name="/QrealWebAzure/QrealWebAzureGroup/LB:Web:Endpoint1" />
          </inToChannel>
        </inPort>
      </componentports>
      <settings>
        <aCS name="MobileCreator:Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" defaultValue="">
          <maps>
            <mapMoniker name="/QrealWebAzure/QrealWebAzureGroup/MapMobileCreator:Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" />
          </maps>
        </aCS>
        <aCS name="MobileCreatorInstances" defaultValue="[1,1,1]">
          <maps>
            <mapMoniker name="/QrealWebAzure/QrealWebAzureGroup/MapMobileCreatorInstances" />
          </maps>
        </aCS>
        <aCS name="Web:Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" defaultValue="">
          <maps>
            <mapMoniker name="/QrealWebAzure/QrealWebAzureGroup/MapWeb:Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" />
          </maps>
        </aCS>
        <aCS name="WebInstances" defaultValue="[1,1,1]">
          <maps>
            <mapMoniker name="/QrealWebAzure/QrealWebAzureGroup/MapWebInstances" />
          </maps>
        </aCS>
      </settings>
      <channels>
        <lBChannel name="LB:MobileCreator:Endpoint1">
          <toPorts>
            <inPortMoniker name="/QrealWebAzure/QrealWebAzureGroup/MobileCreator/Endpoint1" />
          </toPorts>
        </lBChannel>
        <lBChannel name="LB:Web:Endpoint1">
          <toPorts>
            <inPortMoniker name="/QrealWebAzure/QrealWebAzureGroup/Web/Endpoint1" />
          </toPorts>
        </lBChannel>
      </channels>
      <maps>
        <map name="MapMobileCreator:Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" kind="Identity">
          <setting>
            <aCSMoniker name="/QrealWebAzure/QrealWebAzureGroup/MobileCreator/Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" />
          </setting>
        </map>
        <map name="MapMobileCreatorInstances" kind="Identity">
          <setting>
            <sCSPolicyIDMoniker name="/QrealWebAzure/QrealWebAzureGroup/MobileCreatorInstances" />
          </setting>
        </map>
        <map name="MapWeb:Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" kind="Identity">
          <setting>
            <aCSMoniker name="/QrealWebAzure/QrealWebAzureGroup/Web/Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" />
          </setting>
        </map>
        <map name="MapWebInstances" kind="Identity">
          <setting>
            <sCSPolicyIDMoniker name="/QrealWebAzure/QrealWebAzureGroup/WebInstances" />
          </setting>
        </map>
      </maps>
      <components>
        <groupHascomponents>
          <role name="MobileCreator" generation="1" functional="0" release="0" software="C:\Users\nikit_000\Documents\Workspace\QrealWeb\qreal-web\QrealWebAzure\QrealWebAzure\csx\Debug\roles\MobileCreator" entryPoint="base\x64\WaHostBootstrapper.exe" parameters="base\x64\WaIISHost.exe " memIndex="1792" hostingEnvironment="frontendadmin" hostingEnvironmentVersion="2">
            <componentports>
              <inPort name="Endpoint1" protocol="http" portRanges="80" />
            </componentports>
            <settings>
              <aCS name="Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" defaultValue="" />
              <aCS name="__ModelData" defaultValue="&lt;m role=&quot;MobileCreator&quot; xmlns=&quot;urn:azure:m:v1&quot;&gt;&lt;r name=&quot;MobileCreator&quot;&gt;&lt;e name=&quot;Endpoint1&quot; /&gt;&lt;/r&gt;&lt;r name=&quot;Web&quot;&gt;&lt;e name=&quot;Endpoint1&quot; /&gt;&lt;/r&gt;&lt;/m&gt;" />
            </settings>
            <resourcereferences>
              <resourceReference name="DiagnosticStore" defaultAmount="[4096,4096,4096]" defaultSticky="true" kind="Directory" />
              <resourceReference name="EventStore" defaultAmount="[1000,1000,1000]" defaultSticky="false" kind="LogStore" />
            </resourcereferences>
          </role>
          <sCSPolicy>
            <sCSPolicyIDMoniker name="/QrealWebAzure/QrealWebAzureGroup/MobileCreatorInstances" />
            <sCSPolicyUpdateDomainMoniker name="/QrealWebAzure/QrealWebAzureGroup/MobileCreatorUpgradeDomains" />
            <sCSPolicyFaultDomainMoniker name="/QrealWebAzure/QrealWebAzureGroup/MobileCreatorFaultDomains" />
          </sCSPolicy>
        </groupHascomponents>
        <groupHascomponents>
          <role name="Web" generation="1" functional="0" release="0" software="C:\Users\nikit_000\Documents\Workspace\QrealWeb\qreal-web\QrealWebAzure\QrealWebAzure\csx\Debug\roles\Web" entryPoint="base\x64\WaHostBootstrapper.exe" parameters="base\x64\WaIISHost.exe " memIndex="1792" hostingEnvironment="frontendadmin" hostingEnvironmentVersion="2">
            <componentports>
              <inPort name="Endpoint1" protocol="http" portRanges="8080" />
            </componentports>
            <settings>
              <aCS name="Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" defaultValue="" />
              <aCS name="__ModelData" defaultValue="&lt;m role=&quot;Web&quot; xmlns=&quot;urn:azure:m:v1&quot;&gt;&lt;r name=&quot;MobileCreator&quot;&gt;&lt;e name=&quot;Endpoint1&quot; /&gt;&lt;/r&gt;&lt;r name=&quot;Web&quot;&gt;&lt;e name=&quot;Endpoint1&quot; /&gt;&lt;/r&gt;&lt;/m&gt;" />
            </settings>
            <resourcereferences>
              <resourceReference name="DiagnosticStore" defaultAmount="[4096,4096,4096]" defaultSticky="true" kind="Directory" />
              <resourceReference name="EventStore" defaultAmount="[1000,1000,1000]" defaultSticky="false" kind="LogStore" />
            </resourcereferences>
          </role>
          <sCSPolicy>
            <sCSPolicyIDMoniker name="/QrealWebAzure/QrealWebAzureGroup/WebInstances" />
            <sCSPolicyUpdateDomainMoniker name="/QrealWebAzure/QrealWebAzureGroup/WebUpgradeDomains" />
            <sCSPolicyFaultDomainMoniker name="/QrealWebAzure/QrealWebAzureGroup/WebFaultDomains" />
          </sCSPolicy>
        </groupHascomponents>
      </components>
      <sCSPolicy>
        <sCSPolicyUpdateDomain name="WebUpgradeDomains" defaultPolicy="[5,5,5]" />
        <sCSPolicyUpdateDomain name="MobileCreatorUpgradeDomains" defaultPolicy="[5,5,5]" />
        <sCSPolicyFaultDomain name="MobileCreatorFaultDomains" defaultPolicy="[2,2,2]" />
        <sCSPolicyFaultDomain name="WebFaultDomains" defaultPolicy="[2,2,2]" />
        <sCSPolicyID name="MobileCreatorInstances" defaultPolicy="[1,1,1]" />
        <sCSPolicyID name="WebInstances" defaultPolicy="[1,1,1]" />
      </sCSPolicy>
    </group>
  </groups>
  <implements>
    <implementation Id="ddd9c6dc-8c2f-451f-b6e0-9eb571ac0de5" ref="Microsoft.RedDog.Contract\ServiceContract\QrealWebAzureContract@ServiceDefinition">
      <interfacereferences>
        <interfaceReference Id="152728b2-bfcf-41d1-84dc-5cb65a77e93a" ref="Microsoft.RedDog.Contract\Interface\MobileCreator:Endpoint1@ServiceDefinition">
          <inPort>
            <inPortMoniker name="/QrealWebAzure/QrealWebAzureGroup/MobileCreator:Endpoint1" />
          </inPort>
        </interfaceReference>
        <interfaceReference Id="5e085ea8-fc91-4631-b75d-8806c9c1fda3" ref="Microsoft.RedDog.Contract\Interface\Web:Endpoint1@ServiceDefinition">
          <inPort>
            <inPortMoniker name="/QrealWebAzure/QrealWebAzureGroup/Web:Endpoint1" />
          </inPort>
        </interfaceReference>
      </interfacereferences>
    </implementation>
  </implements>
</serviceModel>